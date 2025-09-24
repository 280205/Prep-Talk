'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { 
  Settings, 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Mic, 
  Volume2, 
  Monitor,
  Smartphone,
  Sun,
  Moon,
  Trash2,
  Download,
  Upload,
  Save,
  AlertTriangle,
  Check,
  BarChart2
} from 'lucide-react'
import { toast } from 'sonner'
import LayoutWithSidebar from '@/components/LayoutWithSidebar'
import { useTheme } from '@/contexts/ThemeContext'

interface UserSettings {
  // Account Settings
  userId: string
  language: string
  timezone: string
  
  // Appearance Settings
  theme: 'light' | 'dark' | 'system'
  fontSize: 'small' | 'medium' | 'large'
  
  // Notification Settings
  emailNotifications: boolean
  pushNotifications: boolean
  interviewReminders: boolean
  progressUpdates: boolean
  weeklyReports: boolean
  
  // Audio Settings
  microphoneEnabled: boolean
  audioQuality: 'low' | 'medium' | 'high'
  noiseReduction: boolean
  autoGainControl: boolean
  
  // Privacy Settings
  dataCollection: boolean
  analyticsTracking: boolean
  shareUsageData: boolean
  
  // Interview Settings
  sessionDuration: number
  questionDifficulty: 'Easy' | 'Medium' | 'Hard' | 'Mixed'
  autoSave: boolean
  recordingEnabled: boolean
}

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()
  const [settings, setSettings] = useState<UserSettings>({
    userId: 'demo-user',
    language: 'en',
    timezone: 'Asia/Kolkata',
    theme: theme as 'light' | 'dark' | 'system',
    fontSize: 'medium',
    emailNotifications: true,
    pushNotifications: true,
    interviewReminders: true,
    progressUpdates: true,
    weeklyReports: false,
    microphoneEnabled: true,
    audioQuality: 'high',
    noiseReduction: true,
    autoGainControl: true,
    dataCollection: true,
    analyticsTracking: false,
    shareUsageData: false,
    sessionDuration: 30,
    questionDifficulty: 'Mixed',
    autoSave: true,
    recordingEnabled: true
  })
  
  const [loading, setLoading] = useState(false)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const [userStats, setUserStats] = useState({
    totalSessions: 0,
    totalQuestions: 0,
    avgScore: 0,
    lastActive: null as string | null
  })

  // Load settings on component mount
  useEffect(() => {
    loadSettings()
    loadUserStats()
  }, [])

  // Track unsaved changes
  useEffect(() => {
    setHasUnsavedChanges(true)
  }, [settings])

  const loadUserStats = async () => {
    try {
      const userId = localStorage.getItem('preptalk_user') || 'demo-user'
      
      // Load user progress data
      const progressResponse = await fetch(`/api/progress?userId=${userId}`)
      if (progressResponse.ok) {
        const progressData = await progressResponse.json()
        setUserStats({
          totalSessions: progressData.totalSessions || 0,
          totalQuestions: progressData.totalQuestions || 0,
          avgScore: progressData.averageScore || 0,
          lastActive: progressData.lastActive || null
        })
      }
    } catch (error) {
      console.error('Error loading user stats:', error)
    }
  }

  const loadSettings = async () => {
    try {
      // Get userId from localStorage or use demo-user
      const userId = localStorage.getItem('preptalk_user') || 'demo-user'
      
      const response = await fetch(`/api/settings?userId=${userId}`)
      if (response.ok) {
        const data = await response.json()
        setSettings(prev => ({ ...prev, ...data }))
      } else {
        console.error('Failed to load settings:', response.statusText)
        toast.error('Failed to load settings')
      }
    } catch (error) {
      console.error('Error loading settings:', error)
      toast.error('Failed to load settings')
    }
  }

  const saveSettings = async () => {
    setLoading(true)
    try {
      // Get userId from localStorage or use demo-user
      const userId = localStorage.getItem('preptalk_user') || 'demo-user'
      const settingsToSave = { ...settings, userId }
      
      const response = await fetch('/api/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(settingsToSave)
      })
      
      if (response.ok) {
        const result = await response.json()
        
        // Apply theme change immediately
        if (settings.theme !== 'system') {
          setTheme(settings.theme)
        }
        
        toast.success('Settings saved successfully!')
        setHasUnsavedChanges(false)
      } else {
        const error = await response.json()
        toast.error(error.error || 'Failed to save settings')
      }
    } catch (error) {
      toast.error('Failed to save settings. Please try again.')
      console.error('Error saving settings:', error)
    } finally {
      setLoading(false)
    }
  }

  const resetSettings = async () => {
    if (confirm('Are you sure you want to reset all settings to default? This action cannot be undone.')) {
      try {
        const userId = localStorage.getItem('preptalk_user') || 'demo-user'
        
        const response = await fetch(`/api/settings?userId=${userId}`, {
          method: 'DELETE'
        })
        
        if (response.ok) {
          // Reset to default settings
          setSettings({
            ...settings,
            theme: 'light',
            fontSize: 'medium',
            emailNotifications: true,
            pushNotifications: true,
            interviewReminders: true,
            progressUpdates: true,
            weeklyReports: false,
            microphoneEnabled: true,
            audioQuality: 'high',
            noiseReduction: true,
            autoGainControl: true,
            dataCollection: true,
            analyticsTracking: false,
            shareUsageData: false,
            sessionDuration: 30,
            questionDifficulty: 'Mixed',
            autoSave: true,
            recordingEnabled: true
          })
          toast.success('Settings reset to defaults')
        } else {
          toast.error('Failed to reset settings')
        }
      } catch (error) {
        console.error('Error resetting settings:', error)
        toast.error('Failed to reset settings')
      }
    }
  }

  const exportSettings = async () => {
    try {
      // Get current settings from backend
      const userId = localStorage.getItem('preptalk_user') || 'demo-user'
      const response = await fetch(`/api/settings?userId=${userId}`)
      
      if (response.ok) {
        const currentSettings = await response.json()
        // Remove internal fields before export
        const exportData = { ...currentSettings }
        delete exportData._id
        delete exportData.createdAt
        delete exportData.updatedAt
        
        const dataStr = JSON.stringify(exportData, null, 2)
        const dataBlob = new Blob([dataStr], { type: 'application/json' })
        const url = URL.createObjectURL(dataBlob)
        const link = document.createElement('a')
        link.href = url
        link.download = `preptalk-settings-${userId}.json`
        link.click()
        URL.revokeObjectURL(url)
        toast.success('Settings exported successfully!')
      } else {
        toast.error('Failed to export settings')
      }
    } catch (error) {
      console.error('Error exporting settings:', error)
      toast.error('Failed to export settings')
    }
  }

  const importSettings = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = async (e) => {
      try {
        const importedSettings = JSON.parse(e.target?.result as string)
        
        // Update local state
        setSettings(prev => ({ ...prev, ...importedSettings }))
        
        // Save to backend
        const userId = localStorage.getItem('preptalk_user') || 'demo-user'
        const settingsToSave = { ...importedSettings, userId }
        
        const response = await fetch('/api/settings', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(settingsToSave)
        })
        
        if (response.ok) {
          toast.success('Settings imported and saved successfully!')
          setHasUnsavedChanges(false)
        } else {
          toast.error('Settings imported but failed to save to server')
        }
      } catch (error) {
        console.error('Error importing settings:', error)
        toast.error('Invalid settings file')
      }
    }
    reader.readAsText(file)
  }

  const handleSettingChange = async (key: keyof UserSettings, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }))
    
    // Auto-save for certain critical settings
    const autoSaveSettings = ['theme', 'language', 'timezone']
    if (autoSaveSettings.includes(key)) {
      try {
        const userId = localStorage.getItem('preptalk_user') || 'demo-user'
        const updateData = { userId, [key]: value }
        
        await fetch('/api/settings', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updateData)
        })
        
        // Apply theme change immediately
        if (key === 'theme' && value !== 'system') {
          setTheme(value)
        }
        
        // Show subtle success indication for auto-saved settings
        if (key === 'theme') {
          toast.success('Theme updated!')
        }
      } catch (error) {
        console.error('Auto-save failed:', error)
      }
    }
  }

  return (
    <LayoutWithSidebar>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="max-w-4xl mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Settings</h1>
            <p className="text-gray-600 dark:text-gray-300">Customize your PrepTalk experience</p>
          </div>

          {/* Unsaved Changes Alert */}
          {hasUnsavedChanges && (
            <Alert className="mb-6 border-orange-200 bg-orange-50 dark:bg-orange-900/20 dark:border-orange-900/50">
              <AlertTriangle className="h-4 w-4 text-orange-600 dark:text-orange-400" />
              <AlertDescription className="text-orange-800 dark:text-orange-200">
                You have unsaved changes. Don't forget to save your settings.
              </AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Account Settings */}
            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                  <User className="h-5 w-5" />
                  Account Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="userId" className="text-gray-900 dark:text-gray-100">User ID</Label>
                  <Input
                    id="userId"
                    value={settings.userId}
                    disabled
                    className="bg-gray-100 dark:bg-gray-600 border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Your unique user identifier</p>
                </div>

                <div>
                  <Label htmlFor="timezone" className="text-gray-900 dark:text-gray-100">Timezone</Label>
                  <Select 
                    value={settings.timezone} 
                    onValueChange={(value) => handleSettingChange('timezone', value)}
                  >
                    <SelectTrigger className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600">
                      <SelectItem value="Asia/Kolkata">Asia/Kolkata (IST)</SelectItem>
                      <SelectItem value="America/New_York">America/New_York (EST)</SelectItem>
                      <SelectItem value="Europe/London">Europe/London (GMT)</SelectItem>
                      <SelectItem value="Asia/Tokyo">Asia/Tokyo (JST)</SelectItem>
                      <SelectItem value="Australia/Sydney">Australia/Sydney (AEST)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Appearance Settings */}
            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                  <Palette className="h-5 w-5" />
                  Appearance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="theme" className="text-gray-900 dark:text-gray-100">Theme</Label>
                  <Select 
                    value={settings.theme} 
                    onValueChange={(value: 'light' | 'dark' | 'system') => handleSettingChange('theme', value)}
                  >
                    <SelectTrigger className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600">
                      <SelectItem value="light">
                        <div className="flex items-center gap-2">
                          <Sun className="h-4 w-4" />
                          Light
                        </div>
                      </SelectItem>
                      <SelectItem value="dark">
                        <div className="flex items-center gap-2">
                          <Moon className="h-4 w-4" />
                          Dark
                        </div>
                      </SelectItem>
                      <SelectItem value="system">
                        <div className="flex items-center gap-2">
                          <Monitor className="h-4 w-4" />
                          System
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="fontSize" className="text-gray-900 dark:text-gray-100">Font Size</Label>
                  <Select 
                    value={settings.fontSize} 
                    onValueChange={(value: 'small' | 'medium' | 'large') => handleSettingChange('fontSize', value)}
                  >
                    <SelectTrigger className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600">
                      <SelectItem value="small">Small</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="large">Large</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="language" className="text-gray-900 dark:text-gray-100">Language</Label>
                  <Select 
                    value={settings.language} 
                    onValueChange={(value) => handleSettingChange('language', value)}
                  >
                    <SelectTrigger className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600">
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="hi">हिन्दी</SelectItem>
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="fr">Français</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Notification Settings */}
            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                  <Bell className="h-5 w-5" />
                  Notifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-gray-900 dark:text-gray-100">Email Notifications</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Receive updates via email</p>
                  </div>
                  <Switch
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) => handleSettingChange('emailNotifications', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-gray-900 dark:text-gray-100">Push Notifications</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Browser notifications</p>
                  </div>
                  <Switch
                    checked={settings.pushNotifications}
                    onCheckedChange={(checked) => handleSettingChange('pushNotifications', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-gray-900 dark:text-gray-100">Interview Reminders</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Remind me to practice</p>
                  </div>
                  <Switch
                    checked={settings.interviewReminders}
                    onCheckedChange={(checked) => handleSettingChange('interviewReminders', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-gray-900 dark:text-gray-100">Progress Updates</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Track improvement milestones</p>
                  </div>
                  <Switch
                    checked={settings.progressUpdates}
                    onCheckedChange={(checked) => handleSettingChange('progressUpdates', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-gray-900 dark:text-gray-100">Weekly Reports</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Summary of your activity</p>
                  </div>
                  <Switch
                    checked={settings.weeklyReports}
                    onCheckedChange={(checked) => handleSettingChange('weeklyReports', checked)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Audio Settings */}
            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                  <Mic className="h-5 w-5" />
                  Audio & Recording
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-gray-900 dark:text-gray-100">Recording Enabled</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Allow voice recording for practice</p>
                  </div>
                  <Switch
                    checked={settings.recordingEnabled}
                    onCheckedChange={(checked) => handleSettingChange('recordingEnabled', checked)}
                  />
                </div>

                <div>
                  <Label htmlFor="audioQuality" className="text-gray-900 dark:text-gray-100">Audio Quality</Label>
                  <Select 
                    value={settings.audioQuality} 
                    onValueChange={(value: 'low' | 'medium' | 'high') => handleSettingChange('audioQuality', value)}
                  >
                    <SelectTrigger className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600">
                      <SelectItem value="low">Low (Faster processing)</SelectItem>
                      <SelectItem value="medium">Medium (Balanced)</SelectItem>
                      <SelectItem value="high">High (Best quality)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-gray-900 dark:text-gray-100">Noise Reduction</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Reduce background noise</p>
                  </div>
                  <Switch
                    checked={settings.noiseReduction}
                    onCheckedChange={(checked) => handleSettingChange('noiseReduction', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-gray-900 dark:text-gray-100">Auto Gain Control</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Automatic volume adjustment</p>
                  </div>
                  <Switch
                    checked={settings.autoGainControl}
                    onCheckedChange={(checked) => handleSettingChange('autoGainControl', checked)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Interview Settings */}
            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                  <Settings className="h-5 w-5" />
                  Interview Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="sessionDuration" className="text-gray-900 dark:text-gray-100">Session Duration (minutes)</Label>
                  <Input
                    id="sessionDuration"
                    type="number"
                    value={settings.sessionDuration}
                    onChange={(e) => handleSettingChange('sessionDuration', parseInt(e.target.value))}
                    min="5"
                    max="120"
                    className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100"
                  />
                </div>

                <div>
                  <Label htmlFor="questionDifficulty" className="text-gray-900 dark:text-gray-100">Question Difficulty</Label>
                  <Select 
                    value={settings.questionDifficulty} 
                    onValueChange={(value: 'Easy' | 'Medium' | 'Hard' | 'Mixed') => handleSettingChange('questionDifficulty', value)}
                  >
                    <SelectTrigger className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600">
                      <SelectItem value="Easy">Easy</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Hard">Hard</SelectItem>
                      <SelectItem value="Mixed">Mixed (Recommended)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-gray-900 dark:text-gray-100">Auto Save</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Automatically save session progress</p>
                  </div>
                  <Switch
                    checked={settings.autoSave}
                    onCheckedChange={(checked) => handleSettingChange('autoSave', checked)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Privacy Settings */}
            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                  <Shield className="h-5 w-5" />
                  Privacy & Data
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-gray-900 dark:text-gray-100">Data Collection</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Help improve our service</p>
                  </div>
                  <Switch
                    checked={settings.dataCollection}
                    onCheckedChange={(checked) => handleSettingChange('dataCollection', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-gray-900 dark:text-gray-100">Analytics Tracking</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Anonymous usage statistics</p>
                  </div>
                  <Switch
                    checked={settings.analyticsTracking}
                    onCheckedChange={(checked) => handleSettingChange('analyticsTracking', checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-gray-900 dark:text-gray-100">Share Usage Data</Label>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Share data with partners</p>
                  </div>
                  <Switch
                    checked={settings.shareUsageData}
                    onCheckedChange={(checked) => handleSettingChange('shareUsageData', checked)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Data Management */}
            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                  <Settings className="h-5 w-5" />
                  Data Management
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    onClick={exportSettings}
                    className="flex items-center gap-2 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <Download className="h-4 w-4" />
                    Export Settings
                  </Button>
                  
                  <div>
                    <input
                      type="file"
                      accept=".json"
                      onChange={importSettings}
                      className="hidden"
                      id="import-settings"
                    />
                    <Button
                      variant="outline"
                      onClick={() => document.getElementById('import-settings')?.click()}
                      className="w-full flex items-center gap-2 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <Upload className="h-4 w-4" />
                      Import Settings
                    </Button>
                  </div>
                </div>

                <Separator className="bg-gray-200 dark:bg-gray-700" />

                <Button
                  variant="destructive"
                  onClick={resetSettings}
                  className="w-full flex items-center gap-2"
                >
                  <Trash2 className="h-4 w-4" />
                  Reset to Defaults
                </Button>
              </CardContent>
            </Card>

            {/* User Statistics */}
            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                  <BarChart2 className="h-5 w-5" />
                  Usage Statistics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{userStats.totalSessions}</div>
                    <div className="text-sm text-blue-600 dark:text-blue-400">Total Sessions</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">{userStats.totalQuestions}</div>
                    <div className="text-sm text-green-600 dark:text-green-400">Questions Answered</div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{userStats.avgScore}%</div>
                    <div className="text-sm text-purple-600 dark:text-purple-400">Average Score</div>
                  </div>
                  <div className="text-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                    <div className="text-sm font-bold text-orange-600 dark:text-orange-400">
                      {userStats.lastActive ? new Date(userStats.lastActive).toLocaleDateString() : 'Never'}
                    </div>
                    <div className="text-sm text-orange-600 dark:text-orange-400">Last Active</div>
                  </div>
                </div>
                
                <Button
                  variant="outline"
                  onClick={loadUserStats}
                  className="w-full border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Refresh Statistics
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Save Button */}
          <div className="mt-8 flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => setHasUnsavedChanges(false)}
              className="border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Cancel
            </Button>
            <Button
              onClick={saveSettings}
              disabled={loading || !hasUnsavedChanges}
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Settings
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </LayoutWithSidebar>
  )
}