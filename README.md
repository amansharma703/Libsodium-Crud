# Libsodium-Crud

## Task

```bash
1. Using Node.js create an API on which you can perform basic operations
for CRUD for the user.

2. For every user getting created a signing key will be generated using
ED25519 (use libsodium).

3. Send the private key and public key as the response to user creation and
store the public key in the database.

4. Create a POST /verify route where a signature is received under the XSignature header for the request body and the request body is verified
using the same ED25519 algorithm and the public key stored for that
user in the backend.

5. Don't save the private key in the backend.

6. Please also create a client (No extensive UI Required) to demo the CRUD
and POST /verify route

```
