import React, { Component } from "react";
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import * as Constants from '../constants';
import { post } from 'axios';

const styles = theme => ({
    heroUnit: {
        backgroundColor: theme.palette.background.paper,
    },
    heroContent: {
        maxWidth: 600,
        margin: '0 auto',
        padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
    },
    heroButtons: {
        marginTop: theme.spacing.unit * 4,
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
            width: 1100,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    cardGrid: {
        padding: `${theme.spacing.unit * 8}px 0`,
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing.unit * 6,
    },
});

class MediaPage extends Component {

    state = {
        selectedFile: null,
        images: []
    }

    fetchImages() {
        const username = `my_folder`;
        fetch(`${Constants.serverUrl}/images/${username}`)
            .then(res => res.json())
            .then(images => this.setState({
                images: images.filter(image => image.bytes > 0)
            }))
            .catch(err => console.error(err));
    }

    componentDidMount() {
        console.log('mounted')
        this.fetchImages();
    }

    fileChangedHandler = (event) => {
        this.setState({ selectedFile: event.target.files[0] })
    }

    uploadHandler = () => {
        console.log(this.state.selectedFile)
        const obj = {
            file: this.state.selectedFile,
            data: this.state.selectedFile.name
        };
        var formData = new FormData();
        for (var key in obj) {
            formData.append(key, obj[key]);
        }
        // for (var data of formData) {
        //     console.log(data);
        // }
        const config = {
            headers: {
                'content-type': 'multipart/form-data;boundary=gc0p4Jq0M2Yt08jU534c0p'
            }
        }
        post('http://localhost:8081/upload', formData, config)
            .then((res) => {
                console.log(res)
                alert(res.data);
                if(res=="Upload Successful"){
                    this.fetchImages();
                } 
            })
            .catch((err) => console.log(err));
    }

    render() {
        const { classes } = this.props;
        return (
            <main>
                <div className={classes.heroUnit}>
                    <div className={classes.heroContent}>
                        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                            My Media
                        </Typography>
                        <Typography variant="h6" align="center" color="textSecondary" paragraph>
                            Something short and leading about the collection below—its contents, the creator, etc.
                            Make it short and sweet, but not too short so folks don&apos;t simply skip over it
                            entirely.
                        </Typography>
                        <div className={classes.heroButtons}>
                            <Grid container spacing={16} justify="center">
                                <Grid item>
                                    <div>
                                        <input type="file" onChange={this.fileChangedHandler} />
                                        <button onClick={this.uploadHandler}>Upload!</button>
                                    </div>
                                </Grid>
                                <Grid item>
                                    {/* <Button variant="outlined" color="primary">
                                        Or Do something else
                                    </Button> */}
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                </div>
                <div className={classNames(classes.layout, classes.cardGrid)}>
                    {/* End hero unit */}
                    <Grid container spacing={40}>
                        {this.state.images.map(image => (
                            <Grid item key={image.public_id} sm={6} md={4} lg={3}>
                                <Card className={classes.card}>
                                    <CardMedia
                                        className={classes.cardMedia}
                                        image={image.url}
                                        title={image.context.custom.caption}
                                    />
                                    <CardContent className={classes.cardContent}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {image.context.custom.caption}
                                        </Typography>
                                        <Typography>
                                            {image.context.custom.alt}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small" color="primary">
                                            View
                                        </Button>
                                        <Button size="small" color="primary">
                                            Edit
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </div>
            </main>
        );
    }
}

MediaPage.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MediaPage);
