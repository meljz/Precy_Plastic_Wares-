from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name="landing"),
    path('about/', views.about, name="about"),
    path('featured/', views.featured, name="featured"),
    path('product/', views.productpage, name="product"),
    path('contact/', views.contact, name="contact"),
    path('signup/', views.signup, name="signup"),
]
