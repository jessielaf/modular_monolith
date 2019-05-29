from rest_framework.routers import DefaultRouter
from shifts.views import MainViewSet as Shift
from employees.views import MainViewSet as Employee

router = DefaultRouter()
router.register('employees', Employee)
router.register('shifts', Shift)

urlpatterns = router.urls
