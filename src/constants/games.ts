export interface GameDefinition {
    key: string;
    name: string;
    shortName: string;
    defaultNicknameFormat: string;
    exampleNickname: string;
}

/**
 * The games shown in the Game Access panel.
 *
 * Keep this in sync with the bot's `src/config/games.js`. The saved nickname
 * formats are keyed by `key`, so adding a game here automatically adds its
 * format field to the dashboard.
 */
export const GAMES: GameDefinition[] = [
    {
        key: "aion",
        name: "AION 2",
        shortName: "AION",
        defaultNicknameFormat: "[{tag}] {ign}",
        exampleNickname: "[ARI] AnyaSeren",
    },
    {
        key: "dota",
        name: "DOTA 2",
        shortName: "DOTA",
        defaultNicknameFormat: "{ign}",
        exampleNickname: "AnyaSeren",
    },
];
