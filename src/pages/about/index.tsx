import Link from "next/link";
import {
  Card,
  Header,
  Icon,
  Table,
  TableHeader,
  TableBody,
  TableCell,
  TableRow,
  Image,
} from "semantic-ui-react";
import { useRouter } from "next/router";

export default function About() {
  const router = useRouter();

  return (
    <>
      <main className="org-main">
        <section className="about-project">
          <h1 className="about-project-title">The Cido Project</h1>
          <section className="about-project-table-section">
            <Table className="about-table">
              <TableHeader>
                <TableRow>
                  <TableCell
                    colSpan={2}
                    className="about-table-head"
                    align="left"
                    size="medim"
                  ></TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="about-table-row">
                  <TableCell component="th" scope="row" align="left">
                    <img
                      className="about-project-img"
                      src=""
                      alt="collecting data"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <p className="about-project-p">
                      Hello everyone and thanks for using <b>Cido</b> The
                      project started in 2025 by <b>SungMin H.</b> and{" "}
                      <b>Sakabe Hitomi</b> and <b>Simon H.</b> as a platform to
                      gather Arts collecting, store and manage projects in a
                      centralized way.
                    </p>
                    <p className="about-project-p">Place holder</p>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </section>
        </section>

        <section className="about-us">
          <Header as="h1" className="about-project-title">
            The Team Developers
          </Header>
          <Card.Group className="about-team-card-container">
            <Card className="about-team-card">
              <Image src="" wrapped ui={false} />
              <Card.Content>
                <Card.Header>SungMin</Card.Header>
                <Card.Meta>Founder in Cido</Card.Meta>
                <Card.Description>Founder</Card.Description>
              </Card.Content>
              <Card.Content extra className="about-team-card-link">
                <a href="https://www.linkedin.com/in//">
                  <img
                    src="https://img.shields.io/badge/MinIn-Linkedin-blue?style=flat&logo=Linkedin&logoColor=white"
                    alt="LinkedIn Badge"
                  />
                </a>
                <a href="https://github.com/Minin-inc">
                  <img
                    src="https://img.shields.io/badge/MinIn-Github-black?style=flat&logo=github&logoColor=white"
                    alt="Github Badge"
                  />
                </a>
              </Card.Content>
            </Card>
            <Card className="about-team-card">
              <Image src="" wrapped ui={false} />
              <Card.Content>
                <Card.Header>Seongbong</Card.Header>
                <Card.Meta>Developer in Cido</Card.Meta>
                <Card.Description>
                  Living in Oslo with a passion for coding & start-ups with AI.
                  Handling data from various sources and setting up code is one
                  of my passions. Previously worked as a Data Researcher/analyst
                  & extended my career to follow my passion for Web & AI
                  development.
                </Card.Description>
              </Card.Content>
              <Card.Content extra className="about-team-card-link">
                <a href="https://www.linkedin.com/in/seongbong-hong-080293121">
                  <img
                    src="https://img.shields.io/badge/Simon-Linkedin-blue?style=flat&logo=Linkedin&logoColor=white"
                    alt="LinkedIn Badge"
                  />
                </a>
                <a href="https://github.com/simonhong2022">
                  <img
                    src="https://img.shields.io/badge/Simon-Github-black?style=flat&logo=github&logoColor=white"
                    alt="Github Badge"
                  />
                </a>
              </Card.Content>
            </Card>
          </Card.Group>
        </section>
      </main>
    </>
  );
}
