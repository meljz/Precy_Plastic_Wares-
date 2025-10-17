from django.shortcuts import render
from rest_framework import generics
from .models import Product, Customer, ContactMessage
from .serializers import ProductSerializer, CustomerSerializer, ContactMessageSerializer
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import json

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
    customers = Customer.objects.all().order_by('-id')  # newest first
    return render(request, 'customer_list.html', {"customers": customers})


def customer_messages_page(request):
    messages = ContactMessage.objects.all().order_by('-date_sent')
    return render(request, 'customer_message.html', {"messages": messages})


@csrf_exempt
def submit_contact(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        name = data.get('name')
        email = data.get('email')
        contact = data.get('contact')
        location = data.get('location', '')
        message = data.get('message')  # ✅ new

        # Save to Customer
        Customer.objects.create(
            name=name,
            email=email,
            contact_number=contact,
            location=location
        )

        # Save to ContactMessage
        ContactMessage.objects.create(
            name=name,
            email=email,
            message=message
        )

        return JsonResponse({'message': 'Contact saved successfully'})

class ProductListView(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

class CustomerListView(generics.ListAPIView):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer

class ContactMessageListView(generics.ListAPIView):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer

