import os
from os.path import dirname as up
from datetime import timedelta
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


ALLOWED_HOSTS = ['*','127.0.0.1',]


#admin back to frontend URL 
# from django.contrib import admin
# admin.site.site_url = 'http://localhost:3000/'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True


# Database
# https://docs.djangoproject.com/en/1.11/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}


REST_FRAMEWORK = {
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 10,
    'DEFAULT_PERMISSION_CLASSES': (
        #browsable api login
        'rest_framework.permissions.IsAuthenticated',
        # 'rest_framework.permissions.DjangoModelPermissions',
    ),
    # 'DEFAULT_RENDERER_CLASSES': (
    #     'rest_framework.renderers.JSONRenderer',
    # ),
    'DEFAULT_AUTHENTICATION_CLASSES':(
        # react-redux api login
        'rest_framework_simplejwt.authentication.JWTAuthentication',
        #browsable api login
        'rest_framework.authentication.SessionAuthentication',
        #from ..api import authentication
       
    ),
    'DEFAULT_FILTER_BACKENDS': ('django_filters.rest_framework.DjangoFilterBackend',),
}

#jwt setting
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(days=1),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=7),
    'ROTATE_REFRESH_TOKENS': False,
    'BLACKLIST_AFTER_ROTATION': True,

    'ALGORITHM': 'HS256',
    'SIGNING_KEY': "jfs2!&)6)j_bfbdx#bto*c%#ucx#2i!yz481ak1d!frwf95-=$",
    'VERIFYING_KEY': None,

    'AUTH_HEADER_TYPES': ('Bearer',),
    'USER_ID_FIELD': 'id',
    'USER_ID_CLAIM': 'user_id',

    'AUTH_TOKEN_CLASSES': ('rest_framework_simplejwt.tokens.AccessToken',),
    'TOKEN_TYPE_CLAIM': 'token_type',

    'SLIDING_TOKEN_REFRESH_EXP_CLAIM': 'refresh_exp',
    'SLIDING_TOKEN_LIFETIME': timedelta(minutes=5),
    'SLIDING_TOKEN_REFRESH_LIFETIME': timedelta(days=1),
}


CURRENT_SITE = 'http://127.0.0.1:8080'

#data dir is one level up than server
CIRADA_INITIAL_DATA_LOAD = os.path.join(up(BASE_DIR), 'data')

MY_ENVIRONMENT_NAME = 'CRIADA Development Environment'

# https://github.com/ottoyiu/django-cors-headers
CORS_ORIGIN_WHITELIST = (
    'localhost:8000',
    'localhost:3000',
    '10.0.1.180:3000',
)