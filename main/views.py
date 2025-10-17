from django.shortcuts import render


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

                           