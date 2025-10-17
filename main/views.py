from django.shortcuts import render
from rest_framework import generics
from .models import Product, Customer, ContactMessage
from .serializers import ProductSerializer, CustomerSerializer, ContactMessageSerializer


def home(request):
    return render (request, "landing.html")

def about(request):
    return render (request, "about.html")

def featured(request):
    return render (request, "featured.html")

def productpage(request):
    return render (request, "productpage.html")

def contact(request):
    return render (request, "contact.html")

def signup(request):
    return render (request, "signup.html")

def email_mockup (request):
    return render (request, "email_mockup.html")

def social_mockup (request):
    platform = request.GET.get('platform', '')
    return render (request, "social_mockup.html", {"platform": platform})

def customer_list_page(request):
    return render(request, 'customer_list.html')

def customer_messages_page(request):
    return render(request, 'customer_messages.html')


class ProductListView(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class CustomerListView(generics.ListAPIView):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer

class ContactMessageListView(generics.ListAPIView):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer