import React, { Component } from 'react';
import home from '../../styles/index.scss';
import baseStyle from '../../styles/_base.scss';
import backMobile from '../../styles/components/c-mobile-menu.scss';
import Footer from './Shared/Footer';
import InfoWeb from './Home/InfoWeb';
import CoverPage from './Home/CoverPage';
import InfoMap from './Home/InfoMap';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuVisible: false
    };
  }

  render() {
    return (<div>
      {this.props.menuVisible && <div className={backMobile['menu-back']}></div>}
      <CoverPage />
      {/*<section id="case_study" className={home.infostudy}>
        <CaseStudySlider />
      </section>*/}
      <InfoWeb />
      <section className={[home.infomap, baseStyle.wrap].join(' ')}>
        <InfoMap />
      </section>
      {/*<section className={home['success-story']}>
        <h2>Success Stories</h2>
        <SuccessStoryGallery />
      </section>*/}
      <Footer />
    </div>);
  }

}

Home.propTypes = {
  menuVisible: React.PropTypes.bool
};

export default Home;
