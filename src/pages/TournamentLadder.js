import { SingleEliminationBracket, Match, SVGViewer, createTheme } from "@g-loot/react-tournament-brackets";
import "../App.css"  

export const exampleLadder = [
  {
    id: 1,
    nextMatchId: null,
    tournamentRoundText: "3",
    startTime: "09-05-2025",
    state: "SCHEDULED",
    participants: [
      {
        id: "1",
        resultText: "Won",
        isWinner: true,
        status: "PLAYED",
        name: "Player 1",
        picture: "teamlogos/client_team_default_logo"
      },
      {
        id: "6",
        resultText: "Lost",
        isWinner: false,
        status: "PLAYED",
        name: "Player 6",
        picture: "teamlogos/client_team_default_logo"
      }
    ]
  },
  {
    id: 2,
    nextMatchId: 1,
    tournamentRoundText: "2",
    startTime: "09-05-2025",
    state: "SCHEDULED",
    participants: [
      {
        id: "1",
        resultText: "Won",
        isWinner: true,
        status: "PLAYED",
        name: "Player 1",
        picture: "teamlogos/client_team_default_logo"
      },
      {
        id: "3",
        resultText: "Lost",
        isWinner: false,
        status: "PLAYED",
        name: "Player 3",
        picture: "teamlogos/client_team_default_logo"
      }
    ]
  },
  {
    id: 3,
    nextMatchId: 2,
    tournamentRoundText: "1",
    startTime: "09-05-2025",
    state: "SCORE_DONE",
    participants: [
      {
        id: "1",
        resultText: "Won",
        isWinner: true,
        status: "PLAYED",
        name: "CoKe BoYz",
        picture: "teamlogos/client_team_default_logo"
      },
      {
        id: "2",
        resultText: "Lost",
        isWinner: false,
        status: "PLAYED",
        name: "Aids Team",
        picture: "teamlogos/client_team_default_logo"
      }
    ]
  },
  {
    id: 4,
    nextMatchId: 2,
    tournamentRoundText: "1",
    startTime: "09-05-2025",
    state: "RUNNING",
    participants: [
      {
        id: "3",
        resultText: "Won",
        isWinner: true,
        status: null,
        name: "Player 3",
        picture: "teamlogos/client_team_default_logo"
      },
      {
        id: "4",
        resultText: "Lost",
        isWinner: false,
        status: null,
        name: "Player 4",
        picture: "teamlogos/client_team_default_logo"
      }
    ]
  },
  {
    id: 5,
    nextMatchId: 1,
    tournamentRoundText: "2",
    startTime: "09-05-2025",
    state: "SCHEDULED",
    participants: [
      {
        id: "6",
        resultText: "Won",
        isWinner: true,
        status: null,
        name: "Player 6",
        picture: "teamlogos/client_team_default_logo"
      },
      {
        id: "8",
        resultText: "Lost",
        isWinner: false,
        status: null,
        name: "Player 8",
        picture: "teamlogos/client_team_default_logo"
      }
    ]
  },
  {
    id: 6,
    nextMatchId: 5,
    tournamentRoundText: "1",
    startTime: "09-05-2025",
    state: "SCHEDULED",
    participants: [
      {
        id: "5",
        resultText: "Lost",
        isWinner: false,
        status: null,
        name: "Player 5",
        picture: "teamlogos/client_team_default_logo"
      },
      {
        id: "6",
        resultText: "Won",
        isWinner: true,
        status: null,
        name: "Player 6",
        picture: "teamlogos/client_team_default_logo"
      }
    ]
  },
  {
    id: 7,
    nextMatchId: 5,
    tournamentRoundText: "1",
    startTime: "09-05-2025",
    // Moze tez byc SCHEDULED, SCORE_DONE, PLAYED
    state: "SCORE_DONE",
    participants: [
      {
        id: "7",
        resultText: "Lost",
        isWinner: false,
        status: null,
        name: "Player 7",
        picture: "teamlogos/client_team_default_logo"
      },
      {
        id: "8",
        resultText: "Won",
        isWinner: true,
        status: null,
        name: "Player 8",
        picture: "teamlogos/r7zn4gr8eajivapvjyzd"
      },
    ]
  }
];

const SingleElimination = () => (
  <SingleEliminationBracket
  //   theme={GlootTheme}
    matches={exampleLadder}
    matchComponent={Match}
    svgWrapper={({ children, ...props }) => (
      <SVGViewer
        width={5000}
        height={2500}
        background="rgb(11, 13, 19)"
        SVGBackground="rgb(11, 13, 19)"
        {...props}
      >
        {children}
      </SVGViewer>
    )}
    onMatchClick={(match) => console.log(match)}
    onPartyClick={(match) => console.log(match)}
  />
);

const TournamentLadder = ({name, place, date}) => {
  return (
    <>
      <div className="tournament-title">
        <h1>
          {name}
        </h1>
      </div>
      <div class="tournament-left-blank"></div>
      <SingleElimination />
      <div class="tournament-details">
        <ul className="tournament-details-list">
          <li className="tournament-details-list-element">Miejsce turnieju: <br></br> {place}</li>
          <li className="tournament-details-list-element">Czas turnieju: <br></br> {date}</li>
        </ul>
      </div>
    </>
    );
};
  
//   const GlootTheme = createTheme({
//     textColor: { main: "#000000", highlighted: "#F4F2FE", dark: "#707582" },
//     matchBackground: { wonColor: "#2D2D59", lostColor: "#1B1D2D" },
//     score: {
//       background: {
//         wonColor: `#10131C`,
//         lostColor: "#10131C"
//       },
//       text: { highlightedWonColor: "#7BF59D", highlightedLostColor: "#FB7E94" }
//     },
//     border: {
//       color: "#292B43",
//       highlightedColor: "RGBA(152,82,242,0.4)"
//     },
//     roundHeader: { backgroundColor: "#3B3F73", fontColor: "#F4F2FE" },
//     connectorColor: "#3B3F73",
//     connectorColorHighlight: "RGBA(152,82,242,0.4)",
//     svgBackground: "#0F121C"
//   });
  


export default TournamentLadder;
