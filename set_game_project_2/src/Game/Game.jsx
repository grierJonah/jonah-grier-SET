import './Game.css';
import React from 'react';
import { connect } from 'react-redux';
import Card from './Card/Card';

class Game extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            game_over: false,
        }
    }


    // DISPATCH --> NewGameReducer.js
    onLinkClick(action) {
        this.props.dispatch({ type: action })
    }

    getCardsLink(action, obj) {
        this.props.dispatch({ type: action, cards: obj });
    }

    // DISPATCH --> SelectedCardReducer.js
    onCardClick(action, array) {
        this.props.dispatch({ type: action, deck: array })
    }

    // DISPATCH --> SelectedCardReducer.js
    clickedCard(action, card) {
        this.props.dispatch({ type: action, card: card });
    }

    // DISPATCH --> NewGameReducer.js
    checkMatchingSet(action, game, cardA, cardB, cardC) {
        this.props.dispatch({
            type: action,
            game_map: game,
            card_one: cardA,
            card_two: cardB,
            card_three: cardC
        });
    }

    // DISPATCH --> SelectedCardReducer.js
    resetCards(action) {
        this.props.dispatch({ type: action })
    }

    // DISPATCH --> NewGameReducer.js
    removeCards(action, deck, cards) {
        this.props.dispatch({ type: action, current_deck: deck, clicked_cards: cards });
    }

    toggleSeen() {
        this.setState({
            wasNotSeen: !this.state.wasNotSeen,
        })
    }

    renderGameOver() {
        if (this.props.deck_in_state.game_over) {
            return (
                <div className="game-over">
                    <h1>Game over!</h1>
                    <h3>Your final score was: <span className="game-over-object">{this.props.deck_in_state.end_score}</span></h3>
                    <h3>The number of sets found: <span className="game-over-object">{this.props.deck_in_state.end_sets}</span></h3>
                    <h3>The number of hints used: <span className="game-over-object">{this.props.deck_in_state.end_hints}</span></h3>
                </div>
            )
        }
    }

    render() {
        if (this.props.selected_cards_in_state.clicked_cards.length === 3) {
            let gameboard_obj = this.props.deck_in_state;

            let cardA = this.props.selected_cards_in_state.clicked_cards[0];
            let cardB = this.props.selected_cards_in_state.clicked_cards[1];
            let cardC = this.props.selected_cards_in_state.clicked_cards[2];

            this.checkMatchingSet("CHECK_MATCHING_SET", gameboard_obj, cardA, cardB, cardC);

            this.resetCards("RESET_SELECTED_CARDS");
        }


        if (this.props.deck_in_state.game_over) {
            this.renderGameOver();
        }

        

        return (
            <div className="main-body-container" >
                <div className="header-container">
                    <h1 id="inner-game-title"><a href="../">SET</a></h1>
                </div>
                <div className="side-panel-left-container">
                    <div className="link-container">
                        <ul>
                            <button className="links" onClick={() => this.onLinkClick("NEW_GAME")}>New Game</button>
                            <button className="links" onClick={() => this.getCardsLink("GET_THREE_NEW_CARDS", this.props)}>Open 3 Cards</button>
                            <button className="links" onClick={() => this.onLinkClick("FIND_SET")}>Find Set</button>
                            <button className="links" onClick={() => this.onLinkClick("REFRESH_GAMEBOARD")}>Refresh Gameboard</button>
                        </ul>
                    </div>
                    <div className="game-statistics">
                        <ul>
                            <li>Cards in deck: {this.props.deck_in_state.current_deck.length}</li>
                            <li>Sets found: {(this.props.deck_in_state.num_sets / 2)} </li>
                            <li>Score: {this.props.deck_in_state.score} </li>
                        </ul>
                    </div>
                    <div className="link-container">
                        <ul>
                            <a href="/"><button className="links">Quit</button></a>
                        </ul>
                    </div>
                </div>
                <div className="body-container">
                    <div className="card-container">
                        {
                            <div className="initial-cards">
                                {this.props.deck_in_state.game_board.map((card, value) => {
                                        return (
                                            <Card key={value} card_info={card} card_id={card} shape={card}></Card>
                                        );
                                })}
                                {this.renderGameOver()}
                            </div>
                        }
                    </div>
                </div>
                <div className="side-panel-right-container">
                    <div className="hints-container">
                        {
                            <div className="hints">
                                {this.props.deck_in_state.find_set.map((card, value) => {
                                    return (
                                        <Card key={value} card_info={card} card_id={card} shape={card}></Card>
                                    );
                                })}
                            </div>
                        }
                    </div>
                </div>
            </div >
        );
    }
}

let mapDispatchToProps = function (dispatch, props) {
    return {
        dispatch: dispatch,
    }
}

let mapStateToProps = function (state, props) {
    return {
        deck_in_state: state.deck,
        selected_cards_in_state: state.selected_cards,
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Game)