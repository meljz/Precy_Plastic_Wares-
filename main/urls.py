from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name="landing"),
    path('about/', views.about, name="about"),
    path('featured/', views.featured, name="featured"),
    path('product/', views.productpage, name="product"),
    path('signup/', views.signup, name="signup"),
    path('contact/', views.contact, name="contact"),
    path('contact/email_mockup/', views.email_mockup, name="email_mockup"),
    path('contact/social_mockup/', views.social_mockup, name="social_mockup")
]
