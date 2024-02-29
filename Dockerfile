FROM python:3.12-slim

WORKDIR /code

# Update pip
RUN pip install --upgrade pip

# Copy resources
COPY ./ /code

# Install requirements
RUN pip install --no-cache-dir --upgrade -r /code/requirements.txt

# Give execution permission to folder
RUN chmod -R +x /code/gpt

# Expose port
EXPOSE 80
