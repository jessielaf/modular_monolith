class ModuleAPI:
    def __init__(self, model, base_serializer, serializer_per_role=None):
        self.model = model
        self.base_serializer = base_serializer
        self.serializer_per_role = serializer_per_role
