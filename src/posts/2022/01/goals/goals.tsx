import React from 'react';
import { stripIndents } from 'common-tags';
import { Post } from '../../../Post';

export class Goals extends Post {
  public name = 'Goals';
  public date = new Date('2 January 2022');
  public slug = 'goals';
  public keywords = ['goals', '2022'];
  public hidden = false;
  public excerpt = stripIndents`
        My goals for the year
    `;

  render() {
    return (
      <>
        <h1>Goals</h1>

        <p>
          Hello everyone! Happy 2022. I wanted a place to quickly jot down what I wanted to achieve
          this year by myself. I'm not the biggest fan of lists, but it is indeed satisfactory to be
          able to check something off as completed. 2021 was a fantastic year, but I felt that I
          could lose motivation in something remarkably quickly. I recognize I have poor sleeping
          patterns, and I don't follow many healthy work/life balance practices, so this would
          definitely be something I'd like to pursue this year. I know I can work a lot more than I
          do already!
        </p>

        <p>Briefly, here's what I'd like to get done...</p>

        <ul>
          <li>As mentioned above, a consistent sleeping pattern</li>
          <li>Visit Florida and possibly New York to see internet friends</li>
          <li>Buy a car by working n hours (I have the value worked out)</li>
          <li>Start a passive income stream, but the idea for this is tbc</li>
          <li>Work outside of my bedroom where possible</li>
          <li>Maintain this blog, maybe a new post once or twice a month</li>
        </ul>
      </>
    );
  }
}

const GoalsPage = () => {
  const goals = new Goals();
  return goals.render();
};

export default GoalsPage;