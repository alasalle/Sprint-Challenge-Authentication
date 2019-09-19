## Self-Study/Essay Questions

Demonstrate your understanding of this week's concepts by answering the following free-form questions. Edit this document to include your answers after each question. Make sure to leave a blank line above and below your answer so it is clear and easy to read by your project manager.

1. What is the purpose of using _sessions_?

  - The purpose of sessions is to serve as a kind of pseudo state for the server with information about the client. Because HTTP protocol is stateless, login credentials (and any other information supplied to the server) are by default lost when the client switches pages or makes a different request to the server. Sessions allow for the saving of this information.

1. What does bcrypt do to help us store passwords in a secure manner.

  - bcrypt will hash and salt (manually or automatically) passwords. It will also allow us to assign/add time to the security algorithm with hashing rounds. Using bcrypt, you can store and verify hashed passwords that are resistant to brute force attacks.

1. What does bcrypt do to slow down attackers?

  - The Key Derivation Function (Hash + Time = KDF) is used by bcrypt to slow down attackers. By assigning multiple rounds of hashing, the time it would take to check passwords against rainbow tables quickly adds up to near impossibility.

1. What are the three parts of the JSON Web Token?

  - The three parts of the JSON Web Token are the header, the payload, and the signature