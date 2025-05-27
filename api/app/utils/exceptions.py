class PineconeUploadError(Exception):
    def __init__(self, message="Failed to upload chunks to Pinecone"):
        self.message = message
        super().__init__(self.message)
