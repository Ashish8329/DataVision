from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import DashBoardViewSet

router = DefaultRouter()
router.register(r'data', DashBoardViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
