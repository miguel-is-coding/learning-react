import './App.css'
import {TwitterFollowCard} from "./TwitterFollowCard.jsx";

const users = [
    {
        userName: 'miguel_isCoding',
        name: 'Miguel Ángel Pérez García',
        isFollowing: false,
    },
    {
        userName: 'midudev',
        name: 'Miguel Ángel Durán',
        isFollowing: true,
    },
    {
        userName: 'mouredev',
        name: 'Brais Moure',
        isFollowing: false,
    }
]

export function App() {
    return (
        <section className="App">
            {
                users.map(({userName, name, isFollowing}) =>
                    (
                        <TwitterFollowCard
                            key={userName}
                            userName={userName}
                            initialIsFollowing={isFollowing}
                        >
                            {name}
                        </TwitterFollowCard>
                    ))
            }
        </section>
    )
}
