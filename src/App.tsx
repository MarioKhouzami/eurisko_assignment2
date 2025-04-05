import { Card } from "./Components/card";
import CardSection from "./Components/CardSection";
import NavBar from "./Components/NavBar";
import Search from "./Components/Search";

function App() {
  return (
    <>
      <NavBar />
      <Search />
      <CardSection>
        <Card
          user_initial="JD"
          name="John Doe"
          email="john.doe@example.com"
          status="active"
          date_of_birth="1990-05-15"
        />
        <Card
          user_initial="JS"
          name="Jane Smith"
          email="jane.smith@example.com"
          status="locked"
          date_of_birth="1988-10-22"
        />
        <Card
          user_initial="AJ"
          name="Alice Johnson"
          email="alice.johnson@example.com"
          status="active"
          date_of_birth="1995-02-10"
        />
        <Card
          user_initial="B"
          name="Bob"
          email="bob.martin@example.com"
          status="active"
          date_of_birth="1980-08-05"
        />
        <Card
          user_initial="CB"
          name="Charlie Brown"
          email="charlie.brown@example.com"
          status="active"
          date_of_birth="1992-11-30"
        />
        <Card
          user_initial="DL"
          name="David Lee"
          email="david.lee@example.com"
          status="locked"
          date_of_birth="1987-07-14"
        />
        <Card
          user_initial="E"
          name="Eve"
          email="eve.green@example.com"
          status="active"
          date_of_birth="1993-09-21"
        />
        <Card
          user_initial="FW"
          name="Frank White"
          email="frank.white@example.com"
          status="active"
          date_of_birth="1994-01-25"
        />
        <Card
          user_initial="GB"
          name="Grace Black"
          email="grace.black@example.com"
          status="locked"
          date_of_birth="1985-03-17"
        />
        <Card
          user_initial="H"
          name="Hannah"
          email="hannah.purple@example.com"
          status="active"
          date_of_birth="1996-12-03"
        />
      </CardSection>
    </>
  );
}

export default App;
