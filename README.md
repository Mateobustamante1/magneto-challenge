## The Magneto DNA Challenge
Magneto is recruiting mutants and has challenged us to detect if a given DNA sequence belongs to a mutant or a human. A DNA sequence is considered mutant if it contains more than one sequence of four identical nitrogenous bases (A, T, C, G) either horizontally, vertically, or diagonally.

## The app features a Mutant DNA Detector that:
Allows users to input a DNA matrix.
Validates the matrix to ensure it only contains valid characters (A, T, C, G).
Checks for mutant patterns using a custom JavaScript algorithm.
## Features:
Email Submission: Upon a successful DNA validation (if the user is detected as a mutant), you will be prompted to enter your email to "join Magneto". This is a step to simulate how Magneto would collect new recruits.

## Product Recommendation: 
If the DNA validation fails (i.e., the user is a human), the app will display a component inviting the user to browse and purchase Magneto's product collection. The products are fetched from a mock JSON file simulating an API call, showing real product details. Clicking on a product will take you to the product's real purchase page.

## Mocked Login Credentials:
## User 1:
Username: test1
Password: 12345
## User 2:
Username: test2
Password: 12345
## 
This login simulates a typical authentication process in a secure app, but without backend integration, allowing Magneto's recruitment team to focus on the app's functionality without server setup.

## Styles and Animations
The app has a simple, user-friendly UI with CSS-based styling and basic animations to enhance the user experience.

## Functional and Technical Highlights:
React Components: The project includes several components that demonstrate typical React functionality, such as managing state and handling events.
JavaScript Logic: Custom JavaScript functions handle the DNA sequence validation and mutant detection, showcasing foundational programming skills.
Unit Testing with Jest: Key components are tested with Jest to ensure reliability and functionality.
Product Carousel: Introduced a product carousel for users whose DNA is not detected as mutant, offering a seamless shopping experience with links to real products.
The app  includes a Language Switcher feature, allowing users to choose between different languages, making Typical practice of global applications accessible. The supported languages are managed through a JSON file (locales.json), which contains translations for the text used in the app.
## Development Approach
The application was developed as a frontend-only solution based on discussions with Gabriel Ivan Nocce, who assigned this challenge. As agreed, no backend service was deployed or developed. The focus was on frontend development and creating a simulated environment to demonstrate my skills in UI design, data handling, and testing.


## Future Improvements:
Backend Integration: Adding a real API to handle the DNA analysis would enable a more complete demonstration of mock and service handling skills.
Enhanced Security: Implementing secure hashing and session management for the login process.
Advanced Animations: Adding further animations and transitions to improve UX.
Feedback
I hope this solution meets your expectations, and I am open to discussing it further. Feel free to reach out for any questions, feedback, or suggestions.

## To deploy
## bash
git clone https://github.com/Mateobustamante1/magneto-challenge.git
## Powershell
 npm install /
 npm run dev
## Netlify Deploy:
 https://magneto-challenge-2.netlify.app/

## DNA Validate:
"ATCGGA",
"CAGTGC",
"TTATGT",
"AGAAGG",
"CCCCTA",
"TCACTG"