import { google } from "googleapis";
require("dotenv").config();

interface Calendar {
  name: string;
  id: string;
}

const calendarIds: Calendar[] = [
  {
    name: "Produkt",
    id: "dhqhlbce7oajj7is79bsscc710@group.calendar.google.com",
  },
  { name: "Job", id: "8ocs46knu1el6kjl3j9esecp4c@group.calendar.google.com" },
  {
    name: "Generell",
    id: "rur7v2lhp8260igg33s7r1l0uk@group.calendar.google.com",
  },
];

// Provide the required configuration
const CREDENTIALS = {
  type: "service_account",
  project_id: "pse-chatbot-336911",
  private_key_id: "f2f3c2ab135c07d098a9eb0ef05f73afd191ad22",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCMpKyG+zaWVe9P\nJ/PlblI20FmAIPouf7bNlujbdh90juX+9EIKd00VIYFIb56XmNHjlgtZUtac2j2V\noHF2nqw0vgbzzuRH0LyJ6Ai11CJvGZvAMpAoMUElqDdKqOexF+ogxa1I5tLoE2ki\nRPaK4Yp4n1iK6MC+KsN5DHLcjxMSoLllzzcdqnf2EoKamrViVdppkFYXGNYdAMcn\nqKdvR4aOdasXHLj86aLi0CTYdDQ/XnYs8WiPD6a8rKqpQbI3jZFVV3+icppIYsqW\nV+p1fulYDI2dPW7cw1yO0FCgrOrkcSm9NMw0dYU/VPtcfLn4MoDN/xqhISmkDOnb\nWr3rw/LVAgMBAAECggEAC14EP2z+nTl+W/03F61/kcRsC3Cpj923gm0xTmBBIWxV\nogePbpBJvQy7dIWTAZ6II6HHsoqWY9CO0YZezU8nTM7+ubDDNMZl9VZ5R8BIyoZ9\nFxRvICnU9wxzcEJvvC7vjS0KTlNbq1wQRK+4ES2yrFZNXigllektFIj2n/rPYuis\neZI6ZCc6rDdQc+Uip+cQvpJ+9iExVaWBLrSJHbiZ/K6QJuPXXazelhCG7TmSCGTy\npg7vrQRnSiMv+3wjiJqkWUNCu0sVe3sbgGkGmgowBG3unE0sQPZk25ThUF80fx0V\n1XXqwFOa0jJohVQjyyuCngWzd4MzTUpKayHAxjrtgQKBgQC/Wes7GHrTLPp1+gYx\n34ZC9RW/a2URoc42R7xgXFu6vV9hnCzCq9mYSSpEEM+rGzsf8HVpnTt5j8o1mMYg\nJVzNAmbQTcKKCSkbu320Ik9CjKd5/NUXIy/+6B3GbMD4gploWXDP47W2BjiIGk/8\nUSzMj1KEotUGJWoNU17ADS9jgQKBgQC8KP3Uq1SuUj43xI20bFKehlAnNzUWlvBM\nMhfz0jVx7vPcJNeAvKyU7IEYZkg1e89BtjpBeR/0hcTDyR8icPDntMZjavoPOpn4\nJYAzdlYVTa/ZbAUw5bS0w12iE+bxZWtWcPWpoptq+upajOfDk/k/zudZAK1557ec\n9fmi1zhpVQKBgQCJIDIfjmJutTvjkcIguXNoxmPIYnjyUscJRQ0s7OLbhtw0ggvd\nkfOEW2JLltSLZR9QuywY/JFjgvTAxfOtk7jWPZNaUW9JJllsQ0dI8JFmOo/GLray\nNwgtH0A/My5yqHyxN+9NO3y7reeTOW/6fF2jVk4nON154xQF6qnq7Uf5gQKBgEu0\n7pSgLx1IqBIGOsHqh7+S6TMuKmUhbCQsT6jh3nEuJN5h0HfS8lmlYzfvB4TFgRm+\neWgYlTvsisP/61APQ07nVJ9xzpVMDeFjLVcHeRFvRZ7ksJ4A/plwtf7dpSFhnjOU\nlbOgYopD1QGECkiOBE6hMEKGXEZdbmpwKfZURDVVAoGABV1Crd40bqqDTmOoN37J\nybowxjS3NqmA8Lm6nunAKkFuLUPzJummd05HsSACEG0PuwFjEwpYDHLjp9VS7x1Y\n+cNaq9yRSKFkDdgRtxSRiENPb10yDI0Tq33XY4/ESgEPFBQSYFf/je7BczaeE7Mk\nuindiUnHSbNKYrHgVxHcEjo=\n-----END PRIVATE KEY-----\n",
  client_email: "pse-chatbot@pse-chatbot-336911.iam.gserviceaccount.com",
  client_id: "110106243487053004571",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/pse-chatbot%40pse-chatbot-336911.iam.gserviceaccount.com",
};

// Google calendar API settings
const SCOPES = "https://www.googleapis.com/auth/calendar";
const calendar = google.calendar({ version: "v3" });

const auth = new google.auth.JWT(
  CREDENTIALS.client_email,
  undefined,
  CREDENTIALS.private_key,
  SCOPES
);

// Get date-time string for calender
export const dateTimeForCalander = (
  dateParameter: string,
  timeParameter: string
) => {
  let date = new Date(dateParameter);
  let timeHours = timeParameter.substring(0, 2);
  let timeMin = timeParameter.substring(3, 5);
  date.setHours(parseInt(timeHours));
  date.setMinutes(parseInt(timeMin));
  // Delay in end time is 1
  let endDate = new Date(new Date(date).setHours(date.getHours() + 1));
  return {
    start: date,
    end: endDate,
  };
};

// Insert new event to Google Calendar
export const insertEvent = async (event, theme) => {
  try {
    const calendarId = calendarIds.find((c) => c.name === theme);
    let response = await calendar.events.insert({
      calendarId: calendarId?.id,
      auth: auth,
      requestBody: event,
    });

    if (response["status"] == 200 && response["statusText"] === "OK") {
      return 1;
    } else {
      return 0;
    }
  } catch (error) {
    console.log(`Error at insertEvent --> ${error}`);
    return 0;
  }
};
