from django.contrib import admin
from .models import Product, Customer, ContactMessage

admin.site.register(Product)
admin.site.register(Customer)
admin.site.register(ContactMessage)