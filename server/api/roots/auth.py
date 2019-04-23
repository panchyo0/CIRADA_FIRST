from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework.views import APIView


@method_decorator(login_required, name='dispatch')
class AuthRoot(APIView):
    """
    JWT - JSON Web Token
    ----------------------------------------
    <p> **Auth header type** - Bearer</p>
    <p> **Access token lifetime** - 10 mins</p>
    <p> **Refresh token lifetime** - 1 day</p>

    Method
    ------
    <p> **token_obtain_pair** - get access and refresh token by username and password (post)</p>
    <p> **token_refresh** -  get access token according refresh token(post)</p>
    <p> **token_verify** - verify  access token (post)</p>

    """
    def get(self, request):
        data={
            'token_obtain_pair': reverse('token_obtain_pair', request=request),
            'token_refresh': reverse('token_refresh', request=request),
            'token_verify': reverse('token_verify', request=request),
        }

        return Response(data)