import { SingleEliminationBracket, Match, SVGViewer, createTheme } from "@g-loot/react-tournament-brackets";
import React, { useEffect, useState } from 'react'
import "../App.css"  
import { getEventTree, getMatchParticipants } from "../services/eventService";







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

const LightTheme = createTheme({
  textColor: { main: "#000000", highlighted: "#3F3D56", dark: "#707582" },
  matchBackground: { wonColor: "#E3F2FD", lostColor: "#FFEBEE" },
  score: {
    background: {
      wonColor: "#BBDEFB",
      lostColor: "#FFCDD2",
    },
    text: { highlightedWonColor: "#1E88E5", highlightedLostColor: "#E53935" },
  },
  border: {
    color: "#BDBDBD",
    highlightedColor: "rgba(25,118,210,0.4)",
  },
  roundHeader: { backgroundColor: "#E0E0E0", fontColor: "#212121" },
  connectorColor: "#BDBDBD",
  connectorColorHighlight: "rgba(25,118,210,0.4)",
  svgBackground: "#FAFAFA",
});




const TournamentLadder = ({name, place, date, eventID}) => {

    const [ladderData, setLadderData] = useState(null);


    function flattenBinaryTree(rootMatchId, matchesMap) {

        const size = matchesMap.size;
        const result = new Array(size).fill(null);

        function placeNode(matchId, index) {

            result[index] = matchId;

            const children = matchesMap.get(matchId) || [];

            console.log(matchId, "children", children);
            if (children[0] !== undefined) {
                placeNode(children[0], 2 * index + 1); 
            }

            if (children[1] !== undefined) {
                placeNode(children[1], 2 * index + 2); 
            }
        }

        placeNode(rootMatchId, 0);

        console.log("Flattened binary tree array:", result);

        return result;
    } 

   function generateLadderFromTreeArray(treeArray, matchesParticipants) {

    const halfIndex = Math.floor((treeArray.length + 1) / 2);
    console.log(halfIndex, "halfIndex");
    const length = treeArray.length;

    const ladder = new Array(length);

    for (let i = length - 1; i >= 0; i--) {

        const parentIndex = Math.floor((i - 1) / 2);
        const parentMatchId = parentIndex >= 0 ? treeArray[parentIndex] : null;

        let participants;

        if (i >= halfIndex-1) {
            participants = matchesParticipants[i].participants;
            console.log("gorni", participants);
        console.log(i)

        } else {
            const leftChildIndex = 2 * i + 1;
            const rightChildIndex = 2 * i + 2;

            const leftChildWinner = ladder[leftChildIndex].participants.find(p => p.isWinner).id;
            const rightChildWinner = ladder[rightChildIndex].participants.find(p => p.isWinner).id;

            participants = [leftChildWinner, rightChildWinner];
        }

        const winnerIndex = Math.floor(Math.random() * 2);
        const loserIndex = 1 - winnerIndex;

        ladder[i] = {
            id: treeArray[i],
            nextMatchId: parentMatchId,
            tournamentRoundText: `${Math.floor(Math.log2(i + 1)) + 1}`,
            startTime: "09-05-2025",
            state: "PLAYED",
            participants: [
                {
                    id: `${participants[winnerIndex]}`,
                    resultText: "Won",
                    isWinner: true,
                    status: "PLAYED",
                    name: `Player ${participants[winnerIndex]}`,
                    picture: "teamlogos/client_team_default_logo"
                },
                {
                    id: `${participants[loserIndex]}`,
                    resultText: "Lost",
                    isWinner: false,
                    status: "PLAYED",
                    name: `Player ${participants[loserIndex]}`,
                    picture: "teamlogos/client_team_default_logo"
                }
            ]
        };
    }

    return ladder;
    }


    useEffect(() => {
    const fetchEventTree = async () => {
      try {
        const { rootMatchId, matchesMap } = await getEventTree(eventID);
        const res = flattenBinaryTree(rootMatchId, matchesMap);
        const matches_id = res.filter((matchId) => matchId !== null);

        const matchesParticipants = await Promise.all(
            matches_id.map(async (matchId) => {
                const { participants, referees } = await getMatchParticipants(matchId);
                return { participants, referees };
            })
        );
        console.log("Part", matchesParticipants[5]);

        let exampleLadderv1 = generateLadderFromTreeArray(res, matchesParticipants);
        setLadderData(exampleLadderv1);
        console.log("Fetched event tree:", rootMatchId, matchesMap);

      } catch (err) {
        console.error("Error fetching event tree:", err);
      }
    };

    fetchEventTree();
  }, [eventID]);

    const SingleElimination = () => {
        if (!ladderData) return <div>Loading...</div>; // or null to render nothing

        return (
            <SingleEliminationBracket
            theme={LightTheme}
            matches={ladderData}
            matchComponent={Match}
            svgWrapper={({ children, ...props }) => (
                <SVGViewer
                width={1200}
                height={1000}
                background="rgb(255, 255, 255)"
                SVGBackground="rgb(255, 255, 255)"
                {...props}
                >
                {children}
                </SVGViewer>
            )}
            onMatchClick={(match) => console.log(match)}
            onPartyClick={(match) => console.log(match)}
            />
        );
        };

  return (
    <>
      {/* <div className="tournament-title">
        <h1>{name}</h1>
      </div> */}
      <div className="tournament-wrapper">
        <div className="tournament-left-blank"></div>
        <div className="single-elimination-container">
          <SingleElimination />
        </div>
        <div className="tournament-details">
          <ul className="tournament-details-list">
            <li className="tournament-details-list-element">
              <h2>Miejsce turnieju:</h2> <p>{place}</p>
            </li>
            <li className="tournament-details-list-element">
              <h2>Czas:</h2> <p>{date}</p>
            </li>
          </ul>
        </div>
      </div>
    </>
    );
};

export default TournamentLadder;
