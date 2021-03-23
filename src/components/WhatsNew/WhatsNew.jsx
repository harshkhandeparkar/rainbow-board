  import React, { Component } from 'react';
  import { NavLink } from 'react-router-dom';

  import { setSetting } from '../../util/settings';
  import { version } from '../../../package.json';

  import Grid from '../Grid/Grid';
  import GridItem from '../Grid/GridItem';

  function New({title, desc, version, link, size}) {
    return (
      <GridItem options={{size: size ? size : 1}}>
        <div className="card full-height-card center" style={{ gridColumnEnd: `span ${size ? size : 1}` }}>
          <div className="card-content">
            <span className="card-title styled-text brand-text">{title}</span>
            <p>{desc}</p>
          </div>
          {
            version &&
            <div className="card-action">
              Added in <a target="_blank" rel="noreferrer" href={`https://github.com/HarshKhandeparkar/rainbow-board/releases/${version}`}>v{version.replace('v', '')}</a>
            </div>
          }
          {
            link &&
            <div className="card-action">
              <a target="_blank" rel="noreferrer" href={link}>Link</a>
            </div>
          }
        </div>
      </GridItem>
    )
  }

  export default class WhatsNew extends Component {
    componentDidMount() {
      setSetting('lastVersionChangelogShown', version);
    }

    render() {
      return (
        <div>
          <nav>
            <div className="nav-wrapper header container">
              <span className="brand-logo center styled-text brand-text">What's New</span>
              <NavLink to="/" title="Home">
                <i className="material-icons brand-text">home</i>
              </NavLink>
            </div>
          </nav>

          <Grid
            options={{
              numColumns: 3
            }}
            className="container"
          >
            <New
              title="Delete Page"
              desc="You can delete the current page using the button at the top right corner. Also the current page number and total pages are displayed at the top left corner. Thanks to AnarcHy on Discord for the feedback."
              version="v0.5.3"
            />
            <New
              title="Better Save"
              desc="The saved SVG slide now has a background color. Also, preview for the tool is not included in the saved image."
              version="v0.5.3"
            />
            <New
              title="Better Load"
              desc="The app starts with a splash screen and loads only when ready."
              version="v0.5.3"
            />

            <New
              title="Save Settings"
              desc="Your settings such as theme will be saved and the same theme will be used on restart."
              version="v0.5.2"
            />
            <New
              title="Multiple Pages"
              desc="You can now add multiple pages and switch between them by using the buttons at the left and right edges of the screen."
              version="v0.5.1"
            />
            <New
              title="SVG"
              desc={(<span>Rainbow Board new uses <b>svg</b> instead of <b>canvas</b> which means that now you can save the slide as SVG, the whiteboard is faster, resizing is better and we will add new tools such as text tool in the future.</span>)}
              version="v0.5.0"
            />
          </Grid>
        </div>
      )
    }
  }
