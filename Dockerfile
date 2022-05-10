FROM node:12 AS build-stage

WORKDIR /react-app
COPY react-app/. .

# You have to set this because it should be set during build time.
ENV REACT_APP_BASE_URL=https://step-solution-app.herokuapp.com/
ENV REACT_APP_API_URL=https://stepsolutionapi.herokuapp.com
ENV REACT_APP_OAUTH_CLIENT_ID=ABcfEaQfaumNy1PpUwb3tWzKRcelJQbXUZLVpNkfmWY7oY57yv
ENV REACT_APP_OAUTH_CLIENT_SECRET=fFSmpmU5ryQ1Oqx9n2QREwb75zkDROACdw0Mlwc8
ENV REACT_APP_OAUTH_REDIRECT_URI=https://app.stepsolutionusa.com/profile/user

# Build our React App
RUN npm install
RUN npm run build

FROM python:3.9

# Setup Flask environment
ENV FLASK_APP=app
ENV FLASK_ENV=production
ENV SQLALCHEMY_ECHO=True

EXPOSE 8000

WORKDIR /var/www
COPY . .
COPY --from=build-stage /react-app/build/* app/static/

# Install Python Dependencies
RUN pip install -r requirements.txt
RUN pip install psycopg2

# Run flask environment
CMD gunicorn app:app
