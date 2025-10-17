from django.urls import path
from . import views
from .views import ProductListView, CustomerListView, ContactMessageListView

urlpatterns = [
    path('', views.home, name="landing"),
    path('about/', views.about, name="about"),
    path('featured/', views.featured, name="featured"),
    path('product/', views.productpage, name="product"),
    path('signup/', views.signup, name="signup"),
    path('contact/', views.contact, name="contact"),

    path('contact/email_mockup/', views.email_mockup, name="email_mockup"),
    path('contact/social_mockup/', views.social_mockup, name="social_mockup"),

    path('api/products/', ProductListView.as_view(), name='product-list'),
    path('api/customer/', CustomerListView.as_view(), name='customer-list'),
    path('api/messages/', ContactMessageListView.as_view(), name='message-list'),
    
    path('customer-list/', views.customer_list_page, name='customer-list-page'),
    path('customer-messages/', views.customer_messages_page, name='customer-messages-page'),

]
