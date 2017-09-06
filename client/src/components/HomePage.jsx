//a presentational component of the home page

import React from 'react';
import {Card, CardTitle} from 'material-ui/Card';

const HomePage = () => (
	<Card className = "container">
		<CardTitle title = "Toss Up Application" subtitle = "This is the home page." />
	</Card>
);

export default HomePage; 