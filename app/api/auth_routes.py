from os import access
from flask import Blueprint, jsonify, session, request, redirect
from app.models import User, db
from app.forms import LoginForm
from app.forms import SignUpForm
from flask_login import current_user, login_user, logout_user, login_required

from intuitlib.client import AuthClient
from intuitlib.enums import Scopes
import requests
import json

# auth_client = AuthClient( 'ABmIlDiVhP89JVXkmVEnSlPT6tJUc79ivaywv94Fk57aRwE5Qo', 'LLGiY78TKFZuNXEV5TJzUuYaIdaNeIznF7XsItyf', 'http://localhost:3000/profile/user', 'sandbox' )
auth_client = AuthClient( 'ABcfEaQfaumNy1PpUwb3tWzKRcelJQbXUZLVpNkfmWY7oY57yv', 'fFSmpmU5ryQ1Oqx9n2QREwb75zkDROACdw0Mlwc8', 'https://app.stepsolutionusa.com/profile/user', 'production' )

auth_routes = Blueprint('auth', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@auth_routes.route('/')
def authenticate():
    """
    Authenticates a user.
    """
    if current_user.is_authenticated:
        return current_user.to_dict()
    return {'errors': ['Unauthorized']}


@auth_routes.route('/login', methods=['POST'])
def login():
    """
    Logs a user in
    """
    form = LoginForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # Add the user to the session, we are logged in!
        user = User.query.filter(User.email == form.data['email']).first()
        login_user(user)
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/logout')
def logout():
    """
    Logs a user out
    """
    logout_user()
    return {'message': 'User logged out'}


@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    """
    Creates a new user and logs them in
    """
    form = SignUpForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user = User(
            username=form.data['username'],
            email=form.data['email'],
            password=form.data['password']
        )
        db.session.add(user)
        db.session.commit()
        login_user(user)
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/unauthorized')
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {'errors': ['Unauthorized']}, 401

# @auth_routes.route('/oauth')
# def auth():
#     """Initiates the Authorization flow after getting the right config value"""
#     url = auth_client.get_authorization_url([Scopes.Accountg])
#     return redirect(url)

@auth_routes.route('/oauth-token',methods=['POST'])
def oauth_token():
    data = request.json
    auth_client.get_bearer_token(auth_code=data['code'], realm_id=data['realmId'])
    return {
        "access_token":auth_client.access_token
    }

@auth_routes.route('/company-info')
def company_info():
    base_url = 'https://quickbooks.api.intuit.com'
    url = '{0}/v3/company/{1}/companyinfo/{1}'.format(base_url, auth_client.realm_id)
    auth_header = 'Bearer {0}'.format(auth_client.access_token)
    headers = {
        'Authorization': auth_header,
        'Accept': 'application/json'
    }
    response = requests.get(url, headers=headers)
    return response.json()

@auth_routes.route('/create-invoice', methods=['POST'])
def create_invoice():
    
    base_url = 'https://quickbooks.api.intuit.com'
    url = '{0}/v3/company/{1}/invoice?minorversion=14'.format(base_url, auth_client.realm_id)
    auth_header = 'Bearer {0}'.format(auth_client.access_token)
    headers = {
        'Authorization': auth_header,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
    data = request.json
    print("data:", data)
    payload = json.dumps(data)
    response = requests.post(url, headers=headers, data=payload)
    print(response.json())
    return response.json()


      

