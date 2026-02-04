"""
User Schemas
"""
from marshmallow import Schema, fields, validate


class UserSchema(Schema):
    """User serialization schema"""
    id = fields.Int(dump_only=True)
    email = fields.Email(required=True)
    first_name = fields.Str(required=True)
    last_name = fields.Str(required=True)
    phone = fields.Str()
    profile_picture = fields.Str()
    role = fields.Str(required=True, validate=validate.OneOf(['client', 'provider']))
    is_active = fields.Bool()
    is_verified = fields.Bool()
    created_at = fields.DateTime(dump_only=True)
    updated_at = fields.DateTime(dump_only=True)


class LoginSchema(Schema):
    """Login request schema"""
    email = fields.Email(required=True)
    password = fields.Str(required=True)


class RegisterSchema(Schema):
    """Registration request schema"""
    email = fields.Email(required=True)
    password = fields.Str(required=True, validate=validate.Length(min=8))
    first_name = fields.Str(required=True)
    last_name = fields.Str(required=True)
    phone = fields.Str()
    role = fields.Str(required=True, validate=validate.OneOf(['client', 'provider']))
