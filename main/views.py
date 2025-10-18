from django.shortcuts import render
from rest_framework import generics
from .models import Product, Customer, ContactMessage, UserProfile
from .serializers import ProductSerializer, CustomerSerializer, ContactMessageSerializer
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import json
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.shortcuts import redirect


#========================PAGES START==============================#
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
    #return render (request, "signup.html")
    if request.method == "POST":
        first_name = request.POST.get("first_name")
        last_name = request.POST.get("last_name")
        gender = request.POST.get("gender")
        address = request.POST.get("address")
        contact = request.POST.get("contact")
        email = request.POST.get("email")
        dob = request.POST.get("dob")
        username = request.POST.get("username")
        password = request.POST.get("password")

        if User.objects.filter (username=username).exists ():
            return render (request, "signup.html", {"error": "Username already exist"})

        user = User.objects.create_user(
            username=username,
            email=email,
            password=password,
            first_name=first_name,
            last_name=last_name
        )
        # ✅ Create linked profile
        UserProfile.objects.create(
            user=user,
            gender=gender,
            address=address,
            contact=contact,
            dob=dob
        )
        return redirect("landing")
    return render(request, "signup.html")

#login
def login_view(request): 
    if request.method == "POST":
        username = request.POST.get("username")
        password = request.POST.get("password")

        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            # ✅ Redirect to welcome page
            return redirect("welcome")
        else:
            return render(request, "login.html", {
                "error": "Invalid credentials",
                "hide_footer": True  # ✅ Hide footer
            })

    return render(request, "login.html", {
        "hide_footer": True  # ✅ Hide footer
    })
#welcom
@login_required(login_url='login')  # ✅ REQUIRES login
def welcome(request):
    user = request.user
    try:
        profile = UserProfile.objects.get(user=user)
    except UserProfile.DoesNotExist:
        profile = None
    
    # ✅ SHOWS user profile
    return render(request, "welcome.html", {"profile": profile, "hide_footer": True })

def logout_view(request):
    logout(request)  # ✅ CLEARS session
    return redirect("landing")  # ✅ REDIRECTS to home
#========================PAGES ENDS==============================#


def email_mockup (request):
    return render (request, "email_mockup.html", {
        "hide_footer": True  # ✅ Hide footer
    })

def social_mockup (request):
    platform = request.GET.get('platform', '')
    return render (request, "social_mockup.html", {
        "platform": platform,
        "hide_footer": True  # ✅ Hide footer
    })

def customer_list_page(request):
    customers = Customer.objects.all().order_by('-id')  # newest first
    return render(request, 'customer_list.html', {
        "customers": customers,
        "hide_footer": True  # ✅ Hide footer on this page
    })



def customer_messages_page(request):
    messages = ContactMessage.objects.all().order_by('-date_sent')
    return render(request, 'customer_message.html', {
        "messages": messages,
        "hide_footer": True 
        })


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

