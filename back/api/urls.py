from django.conf import settings
from django.conf.urls.static import static
from django.urls import path
from . import views

urlpatterns = [
    path('produtos', views.listar_produtos),
    path('produtos/<int:codigoProduto>', views.detalhar_produto),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
