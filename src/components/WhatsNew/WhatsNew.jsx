  import React, { Component } from 'react';
  import { NavLink } from 'react-router-dom';

  import { setSetting } from '../../util/settings';
  import { version } from '../../../package.json';

  import Grid from '../Grid/Grid';
  import GridItem from '../Grid/GridItem';

  function New({title, desc, version, link, size}) {
    return (
      <GridItem options={{width: size ? size : 1}}>
        <div className="card full-height-card center">
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
              title="Desktop App Features"
              desc="The app has been changed to look more like a desktop app than a web app running in a wrapper.
              A new menu has been added along with other changes. Starting from now, the web app will not be updated beyond
              v0.5.4 because maintaining both is not possible. New optimizations and features will be added to the desktop app and the website
              will be used as an about page.
              "
              version="v0.6.0"
              size={2}
            />
            <New
              title="Hotter Keys"
              desc="New hotkeys (keyboard shortcuts) have been added to almost every action such as adding pages, changing the page, color palette and choosing the tool.
              Use the top menu to find out which hotkey does what."
              version="v0.6.0"
              size={1}
            />

            <New
              title="Multiple Pages Bug Fix"
              desc={
                <span>
                  There was a bug in multiple pages as reported by AnarcHy on Discord:

                  <blockquote>
                  1) start a new project
                  2) write down '1' on first slide
                  3) create new slide and write down '2'
                  4) go back to first slide, do not change anything
                  5) go to slide 2 again, add new slide and write down '3'
                  6) create new slide and write down '4'
                  7) go back to the previous slide and see the magic happen. It says '2', although we expect it to say '3'

                  I also found a similar incorrect behaviour in some other scenarios, but this was the simplest one I found that shows it. Guess it will be the same source for the error as in these other scenarios.
                  Basically, if you go back a single slide from the latest one, then go on to create two new slides and then go back to the first one that was newly created, it does not show what was written down on it, but another one from the series. Which one it shows I did not find the pattern yet.
                  </blockquote>

                  This bug has been fixed.
                </span>
              }
              version="v0.5.4"
              size={3}
            />
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
