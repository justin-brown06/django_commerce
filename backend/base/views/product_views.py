from rest_framework.decorators import api_view
from base.models import Product
from base.serializers import ProductSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(["GET"])
def getProducts(req):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)

    return Response(serializer.data)


@api_view(["GET"])
def getProduct(req, pk):
    product = Product.objects.get(_id=pk)
    serializer = ProductSerializer(product, many=False)

    return Response(serializer.data)
