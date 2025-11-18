import {buildValidationSchema} from './validation.utils';
import { FormField } from "../types/claims.type";



describe("buildValidationSchema", () => {
  it("creates a schema with required string field", async () => {
    const fields:FormField[] = [
      {
        id: "name",
        type: "text",
        label: "Name",
        validation: { required: true, minLength: 3, maxLength: 10 },
        options: [],
      },
    ];

    const schema = buildValidationSchema(fields);

    // valid case
    await expect(schema.validate({ name: "Alice" })).resolves.toEqual({ name: "Alice" });

    // too short
    await expect(schema.validate({ name: "Al" })).rejects.toThrow(
      "Name must be at least 3 characters"
    );

    // too long
    await expect(schema.validate({ name: "Aliceeeeeee" })).rejects.toThrow(
      "Name must be at most 10 characters"
    );

    // missing required
    await expect(schema.validate({})).rejects.toThrow("Name is required");
  });

  it("creates a schema with number field and min/max", async () => {
    const fields:FormField[] = [
      {
        id: "age",
        type: "number",
        label: "Age",
        validation: { required: true, min: 18, max: 65 },
        options: [],
      },
    ];

    const schema = buildValidationSchema(fields);

    await expect(schema.validate({ age: 30 })).resolves.toEqual({ age: 30 });
    await expect(schema.validate({ age: 10 })).rejects.toThrow("Age must be at least 18");
    await expect(schema.validate({ age: 70 })).rejects.toThrow("Age must be at most 65");
    await expect(schema.validate({ age: "abc" })).rejects.toThrow("Must be a number");
  });

  it("validates email pattern", async () => {
    const fields:FormField[] = [
      {
        id: "email",
        type: "text",
        label: "Email",
        validation: { required: true, pattern: "email" },
        options: [],
      },
    ];

    const schema = buildValidationSchema(fields);

    await expect(schema.validate({ email: "test@example.com" })).resolves.toEqual({
      email: "test@example.com",
    });

    await expect(schema.validate({ email: "invalid-email" })).rejects.toThrow(
      "Invalid email format"
    );
  });

  it("validates phone pattern", async () => {
    const fields:FormField[] = [
      {
        id: "phone",
        type: "text",
        label: "Phone",
        validation: { required: true, pattern: "phone" },
        options:[]
      },
    ];

    const schema = buildValidationSchema(fields);

    await expect(schema.validate({ phone: "0123456789" })).resolves.toEqual({
      phone: "0123456789",
    });

    await expect(schema.validate({ phone: "12345" })).rejects.toThrow(
      "Invalid phone number format. Must be 10-11 digits starting with 0"
    );
  });

  it("validates string-only pattern", async () => {
    const fields:FormField[] = [
      {
        id: "firstName",
        type: "text",
        label: "First Name",
        validation: { required: true, pattern: "string" },
        options:[]
      },
    ];

    const schema = buildValidationSchema(fields);

    await expect(schema.validate({ firstName: "John" })).resolves.toEqual({
      firstName: "John",
    });

    await expect(schema.validate({ firstName: "John123" })).rejects.toThrow(
      "First Name must contain only letters"
    );
  });

  it("handles optional field when not required", async () => {
    const fields:FormField[] = [
      {
        id: "nickname",
        type: "text",
        label: "Nickname",
        validation: { required: false },
        options: [],
      },
    ];

    const schema = buildValidationSchema(fields);

    // should allow empty
    await expect(schema.validate({})).resolves.toEqual({});
  });
});
