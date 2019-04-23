from django.conf.urls import url, include
from django.urls import path
from . import views
from .utilities.hybridrouter import HybridRouter
from .roots.auth import AuthRoot


from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)


router = HybridRouter()
#root
router.add_api_view('Auth',url(r'auth/$', AuthRoot.as_view(), name='jwt_auth'))
router.register(r'first',views.FirstViewSet,'first')

urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls')),
    
    #auth url
    url(r'^auth/token/$', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    url(r'^auth/token/refresh/$', TokenRefreshView.as_view(), name='token_refresh'),
    url(r'^auth/token/verify/$', TokenVerifyView.as_view(), name='token_verify'),

]