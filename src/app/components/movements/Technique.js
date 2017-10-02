import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { connect } from 'react-redux';
import { Card, CardActions, CardMedia, CardTitle, CardHeader, CardText } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import HighlightOff from 'material-ui/svg-icons/action/highlight-off'
import { List, ListItem } from 'material-ui/List';
import { Link } from 'react-router'
import Avatar from 'material-ui/Avatar';
import FlatButton from 'material-ui/FlatButton';
import LazyLoad from 'react-lazyload';
import Swipeable from 'react-swipeable';

const RIGHT = '-1';
const LEFT = '+1';

const styles = {
    container: {
        marginTop: '64px',
        padding: '24px'
    },
    card: {
        marginBottom: '10px',
    },
    title: {
        color: '#AB232F',
        fontSize: '0.9em',
        margin: '0 -19px'
    },
    close: {
        position: 'absolute'
    },
};

@connect((store) => {
    return { techniques: store.techniques }
})
class Technique extends Component {

    constructor(props) {
        super(props);
        const { id } = this.props.params;
        this.state = { index: Number(id) };
    }

    onSwiped(direction) {
        const { category, subcategory } = this.props.params;
        const change = direction === RIGHT ? RIGHT : LEFT;
        const adjustedIdx = this.state.index + Number(change);
        let newIdx;
        if (adjustedIdx >= this.props.techniques[category][subcategory].length) {
            newIdx = 0;
        } else if (adjustedIdx < 0) {
            newIdx = this.props.techniques[category][subcategory].length - 1
        } else {
            newIdx = adjustedIdx;
        }
        this.setState({ index: newIdx });
    }

    render() {
        const { category, subcategory, id } = this.props.params;
        const { index = 0 } = this.state;
        const techniques = this.props.techniques[category][subcategory];
        let technique = techniques[index];

        if (technique) {
            return (
                <div style={styles.container}>
                    <Swipeable
                        className="swipe"
                        trackMouse
                        style={{ touchAction: 'none' }}
                        preventDefaultTouchmoveEvent
                        onSwipedLeft={() => this.onSwiped(LEFT)}
                        onSwipedRight={() => this.onSwiped(RIGHT)}>
                        <Row>
                            <Col key={technique.id} xs={12}>
                                <Card style={styles.card}>
                                    <Row end="xs">
                                        <Col xs={12} style={styles.close}>
                                            <Link to='/'>
                                                <IconButton><HighlightOff /></IconButton>
                                            </Link>
                                        </Col>
                                    </Row>
                                    <LazyLoad height={200} offset={100}>
                                        <CardHeader
                                            title={technique.title}
                                            subtitle={`${category}/${subcategory}`}
                                            avatar={technique.img}
                                        />
                                    </LazyLoad>
                                    <CardText dangerouslySetInnerHTML={{ __html: technique.description }}>
                                    </CardText>
                                    <CardActions>
                                        <Row className='no-margin'>
                                            <Col xs={6}>
                                                <FlatButton label="<" onClick={() => this.onSwiped(RIGHT)} />
                                            </Col>
                                            <Col xs={6}>
                                                <FlatButton className="float-right" label=">" onClick={() => this.onSwiped(LEFT)} />
                                            </Col>
                                        </Row>
                                    </CardActions>
                                </Card>
                            </Col>
                        </Row>
                    </Swipeable>
                </div>
            )
        } else {
            return (
                <div style={styles.container}>
                    <Row>
                        <Col xsOffset={2} xs={8}>
                            <Card style={styles.card}>
                                <Row end="xs">
                                    <Col xs={12} style={styles.close}>
                                        <Link to='/'>
                                            <IconButton><HighlightOff /></IconButton>
                                        </Link>
                                    </Col>
                                </Row>
                                <CardHeader
                                    title='Technique non trouvée !'
                                    subtitle='(-‿◦)'
                                />
                                <CardText>
                                    <Row>
                                        <Col xs={12}>
                                            <em>"Échouer, c’est avoir l’opportunité de recommencer de manière plus intelligente."</em><br />
                                        </Col>
                                    </Row>
                                    <Row end="xs">
                                        <Col xs={12}>
                                            <strong>- Henry Ford</strong>
                                        </Col>
                                    </Row>
                                </CardText>
                            </Card>
                        </Col>
                    </Row>
                </div>
            )
        }
    }

}

export default Technique