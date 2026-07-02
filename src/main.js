import './styles.css';
import { render } from './lib/render.js';
import { watchResize } from './lib/scale.js';

watchResize();
render();
