"use client";

import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Play, MessageSquare, Zap, Mic, Brain, TrendingUp, Award, Target, Star, ArrowRight, CheckCircle, Users, Clock, BarChart2 } from "lucide-react"
import LayoutWithSidebar from "@/components/LayoutWithSidebar"
import { useState, useEffect } from "react"

export default function Home() {
  const [splineLoaded, setSplineLoaded] = useState(false)
  const [splineError, setSplineError] = useState(false)

  useEffect(() => {
    // Set a timeout to hide the loading state after 10 seconds
    const timer = setTimeout(() => {
      if (!splineLoaded) {
        setSplineError(true)
      }
    }, 10000)

    return () => clearTimeout(timer)
  }, [splineLoaded])

  return (
    <LayoutWithSidebar>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="container mx-auto px-6 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
            <div className="text-gray-900 dark:text-gray-100 space-y-8">
              <div className="inline-flex items-center gap-2 bg-gray-200/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full px-4 py-2 border border-gray-300 dark:border-gray-600">
                <Zap className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-medium text-gray-900 dark:text-gray-100">AI-Powered Interview Coach</span>
              </div>

              <div className="space-y-4">
                <h1 className="text-5xl lg:text-7xl font-bold leading-tight text-gray-900 dark:text-gray-100">
                  Master Your
                  <br />
                  <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Interview Skills
                  </span>
                </h1>
                
                <p className="text-xl text-gray-700 dark:text-gray-300 max-w-lg leading-relaxed">
                  Practice with our AI-powered robot coach. Get real-time feedback, improve your confidence, and land your dream job.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/practice">
                  <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2">
                    <Play className="w-5 h-5" />
                    Start Practice Now
                  </Button>
                </Link>
                
                <Link href="/assistant">
                  <Button variant="outline" className="border-gray-400 dark:border-gray-600 text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 px-8 py-3 rounded-lg font-semibold text-lg flex items-center gap-2">
                    <MessageSquare className="w-5 h-5" />
                    Meet AI Assistant
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">10K+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Successful Interviews</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">95%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Success Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">24/7</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">AI Support</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">50+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Industry Domains</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative h-[600px] rounded-2xl overflow-hidden bg-white dark:bg-gray-800 shadow-xl border border-gray-200 dark:border-gray-700">
                <iframe 
                  src='https://my.spline.design/nexbotrobotcharacterconcept-9KonZCe89NMsCeH0w3cKwQAI/' 
                  frameBorder='0' 
                  width='100%' 
                  height='100%'
                  className="w-full h-full"
                  title="3D AI Robot Assistant"
                  loading="eager"
                  allowFullScreen
                  onLoad={() => {
                    console.log('Spline iframe loaded successfully')
                    setSplineLoaded(true)
                  }}
                  onError={() => {
                    console.error('Spline iframe failed to load')
                    setSplineError(true)
                  }}
                />
                
                {/* Fallback content if Spline doesn't load */}
                <div className={`absolute inset-0 flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-700 transition-opacity duration-500 ${splineLoaded && !splineError ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                  <div className="text-center text-gray-800 dark:text-gray-200 space-y-4">
                    <div className="w-24 h-24 mx-auto bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                      <Brain className="w-12 h-12 text-white" />
                    </div>
                    {splineError ? (
                      <>
                        <p className="text-lg font-semibold">3D Experience Unavailable</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Interactive robot loading failed</p>
                      </>
                    ) : (
                      <>
                        <p className="text-lg font-semibold">AI Assistant Loading...</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Interactive 3D Robot Experience</p>
                        <div className="flex justify-center">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
                        </div>
                      </>
                    )}
                  </div>
                  
                  {/* Built with Spline badge - only show when loading/error */}
                  <div className="absolute bottom-4 right-4 bg-gray-900/80 backdrop-blur-sm rounded-lg px-3 py-1 flex items-center gap-2">
                    <div className="w-4 h-4 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
                    <span className="text-white text-sm font-medium">Built with Spline</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Everything you need to ace your interviews
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Our comprehensive platform provides all the tools and insights you need to master the interview process
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="group hover:shadow-2xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Mic className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
                  Voice-Based Practice
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  Take realistic mock interviews with voice input and get instant feedback
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Link href="/practice" className="w-full">
                  <Button 
                    variant="outline" 
                    className="w-full group-hover:bg-gradient-to-r group-hover:from-purple-500 group-hover:to-pink-500 group-hover:text-white group-hover:border-transparent transition-all duration-300"
                  >
                    Start Practice
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
                  AI Feedback
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  Receive detailed feedback on your tone, grammar, and content
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Link href="/reports" className="w-full">
                  <Button 
                    variant="outline" 
                    className="w-full group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-cyan-500 group-hover:text-white group-hover:border-transparent transition-all duration-300"
                  >
                    View Reports
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
                  Track Progress
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  Monitor your improvement over time with visual analytics
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Link href="/dashboard" className="w-full">
                  <Button 
                    variant="outline" 
                    className="w-full group-hover:bg-gradient-to-r group-hover:from-green-500 group-hover:to-emerald-500 group-hover:text-white group-hover:border-transparent transition-all duration-300"
                  >
                    See Dashboard
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
                  AI Assistant
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  Get interview tips and answers to your questions from our AI assistant
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Link href="/assistant" className="w-full">
                  <Button 
                    variant="outline" 
                    className="w-full group-hover:bg-gradient-to-r group-hover:from-orange-500 group-hover:to-red-500 group-hover:text-white group-hover:border-transparent transition-all duration-300"
                  >
                    Chat Now
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Why candidates choose PrepTalk?
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Our AI-powered platform has helped thousands of candidates land their dream jobs with personalized interview coaching.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Real-time AI Feedback
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Get instant feedback on your answers, tone, and body language to improve continuously.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0 mt-1">
                    <BarChart2 className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Progress Tracking
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Monitor your improvement with detailed analytics and personalized recommendations.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0 mt-1">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      24/7 Availability
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Practice anytime, anywhere with our AI coach that's always ready to help you improve.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                <div className="text-3xl font-bold text-purple-600 mb-2">10K+</div>
                <div className="text-gray-600 dark:text-gray-300">Successful Interviews</div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                <div className="text-3xl font-bold text-green-600 mb-2">95%</div>
                <div className="text-gray-600 dark:text-gray-300">Success Rate</div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                <div className="text-3xl font-bold text-blue-600 mb-2">50+</div>
                <div className="text-gray-600 dark:text-gray-300">Industry Domains</div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                <div className="text-3xl font-bold text-orange-600 mb-2">24/7</div>
                <div className="text-gray-600 dark:text-gray-300">AI Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              What our users say
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Join thousands of successful candidates who have improved their interview skills
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
              <CardHeader>
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <CardDescription className="text-gray-700 dark:text-gray-300 text-base">
                  "PrepTalk helped me land my dream job at Google! The AI feedback was incredibly detailed and helped me improve my confidence."
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">Sarah Chen</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Software Engineer at Google</div>
                  </div>
                </div>
              </CardFooter>
            </Card>

            <Card className="border-0 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20">
              <CardHeader>
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <CardDescription className="text-gray-700 dark:text-gray-300 text-base">
                  "The progress tracking feature is amazing! I could see my improvement over time and focus on areas that needed work."
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">Michael Rodriguez</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Product Manager at Microsoft</div>
                  </div>
                </div>
              </CardFooter>
            </Card>

            <Card className="border-0 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
              <CardHeader>
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <CardDescription className="text-gray-700 dark:text-gray-300 text-base">
                  "The AI assistant is like having a personal interview coach available 24/7. It helped me prepare for tough technical questions."
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">Emily Johnson</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Data Scientist at Amazon</div>
                  </div>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to transform your career?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of successful candidates who have improved their interview skills with our AI-powered platform
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-2xl hover:shadow-pink-500/25 transition-all duration-300">
                  Get Started Free
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              
              <Link href="/practice">
                <Button variant="outline" className="border-2 border-white/50 text-white hover:bg-white hover:text-gray-900 backdrop-blur-sm px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg">
                  Try Demo Interview
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </LayoutWithSidebar>
  );
}