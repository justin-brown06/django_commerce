from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework.relations import PrimaryKeyRelatedField
from rest_framework_simplejwt.tokens import RefreshToken
from .models import BillingAddress, Product, ShippingAddress


class ShippingAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShippingAddress
        fields = "__all__"


class BillingAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = BillingAddress
        fields = "__all__"


class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    _id = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)

    billing_address = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = [
            "_id",
            "username",
            "email",
            "first_name",
            "last_name",
            "isAdmin",
        ]

    def get__id(self, obj):
        _id = obj.id
        return _id

    def get_isAdmin(self, obj):
        isAdmin = obj.is_staff
        return isAdmin

    def get_name(self, obj):
        name = obj.first_name
        if name == "":
            name = obj.email
        return name

    def get_billing_address(self, obj):
        billing_address = obj.billing_address_set.all()
        serializer = BillingAddressSerializer(billing_address, many=True)

        return serializer.data


class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)
    billing_address = serializers.SerializerMethodField(read_only=True)
    shipping_address = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = [
            "_id",
            "username",
            "email",
            "first_name",
            "last_name",
            "isAdmin",
            "token",
            "billing_address",
            "shipping_address",
        ]

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)

    def get_billing_address(self, obj):
        billing_address = obj.billing_address.all()
        serializer = BillingAddressSerializer(billing_address, many=True)

        return serializer.data

    def get_shipping_address(self, obj):
        shipping_address = obj.shipping_address.all()
        serializer = ShippingAddressSerializer(shipping_address, many=True)

        return serializer.data


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = "__all__"
