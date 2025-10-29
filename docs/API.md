# API Documentation

## Base URL

```
Development: http://localhost:3000
Production: TBD
```

## Endpoints

### Health Check

**GET** `/health`

Response:
```json
{
  "status": "healthy",
  "timestamp": "2025-10-29T10:00:00.000Z",
  "database": "MongoDB Atlas",
  "environment": "development"
}
```

---

## Experiments (Coming Soon)

**GET** `/api/experiments` - List experiments  
**POST** `/api/experiments` - Create experiment  
**GET** `/api/experiments/:id` - Get details  
**PUT** `/api/experiments/:id` - Update  
**DELETE** `/api/experiments/:id` - Delete  

---

## Variants (Coming Soon)

**GET** `/api/variants/:experimentId` - Get variants  
**POST** `/api/variants` - Create variant  

---

## Analytics (Coming Soon)

**GET** `/api/analytics/:experimentId` - Get analytics  

---

## Error Format

```json
{
  "error": "Error message"
}
```

### Status Codes

- `200` OK
- `201` Created
- `400` Bad Request
- `401` Unauthorized
- `404` Not Found
- `500` Server Error
