## The Magneto DNA Challenge##
Magneto is recruiting mutants and has challenged us to detect if a given DNA sequence belongs to a mutant or a human. A DNA sequence is considered mutant if it contains more than one sequence of four identical nitrogenous bases (A, T, C, G) either horizontally, vertically, or diagonally.

## The app features a Mutant DNA Detector that:
Allows users to input a DNA matrix.
Validates the matrix to ensure it only contains valid characters (A, T, C, G). Checks for mutant patterns using a custom JavaScript algorithm. Login and Data Mocking This project includes a test login feature, which authenticates users with mock data. No hashing or security layers were implemented, as the goal was to demonstrate data mocking practices.

## Mocked login credentials:
## User 1: username: test1 / password: 12345 User 2: username: test2 / password: 12345 
This login simulates a typical authentication process in a secure app, but without backend integration, allowing Magneto's recruitment team to focus on the app's functionality without server setup.

## Styles and Animations
The app has a simple, user-friendly UI with CSS-based styling and basic animations to enhance the user experience.

## Functional and Technical Highlights
React Components: The project includes several components that demonstrate typical React functionality, such as managing state and handling events. JavaScript Logic: Custom JavaScript functions handle the DNA sequence validation and mutant detection, showcasing foundational programming skills. Unit Testing with Jest: Key components are tested with Jest to ensure reliability and functionality.

## Development Approach
The application was developed as a frontend-only solution based on discussions with Gabriel Ivan Nocce, who assigned this challenge. As agreed, no backend service was deployed or developed. The focus was on frontend development and creating a simulated environment to demonstrate my skills in UI design, data handling, and testing.

If a backend API had been available, I would have showcased advanced mocking techniques, a common practice in my work within financial services, to simulate API responses more accurately.

Future Improvements Backend Integration: Adding a real API to handle the DNA analysis would enable a more complete demonstration of mock and service handling skills. Enhanced Security: Implementing secure hashing and session management for the login process. Advanced Animations: Adding further animations and transitions to improve UX. Feedback I hope this solution meets your expectations, and I am open to discussing it further. Feel free to reach out for any questions, feedback, or suggestions.


## To deploy
 
 Git clone https://github.com/Mateobustamante1/magneto-challenge.git

 npm install

 npm run dev

## Netlify Deploy: https://magneto-challenge-2.netlify.app/

 Login: user test1   pasword:12345
        user test2   pasword:12345
      
## DNA Validate:
              "ATCGGA",
              "CAGTGC",
              "TTATGT",
              "AGAAGG",
              "CCCCTA",
              "TCACTG",