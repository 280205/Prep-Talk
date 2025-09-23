FROM python:3.11-slimFROM python:3.11-slim



WORKDIR /appWORKDIR /app



# Copy requirements and install dependencies# Copy requirements first for better caching

COPY requirements.txt .COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txtRUN pip install --no-cache-dir -r requirements.txt



# Copy the application code# Copy the application code

COPY . .COPY . .



# Expose the port# Expose the port

EXPOSE 10000EXPOSE 8000



# Set environment variables# Command to run the application

ENV PYTHONPATH=/appCMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
ENV PORT=10000

# Run the application
CMD ["python", "main.py"]