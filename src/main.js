import { createApp } from 'vue';
import router from './router.js';
import store from './store/index.js';

import App from './App.vue';

//styles
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import 'primevue/resources/primevue.min.css'; 
import 'primevue/resources/themes/fluent-light/theme.css';

//global components
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Textarea from 'primevue/textarea';
import Checkbox from 'primevue/checkbox';
import LinkButton from './components/ui/LinkButton.vue';
import ProgressSpinner from 'primevue/progressspinner';
import Message from 'primevue/message';
import Dialog from 'primevue/dialog';

const app = createApp(App);

//global components
app.component('Button', Button);
app.component('InputText', InputText);
app.component('InputNumber', InputNumber);
app.component('Textarea', Textarea);
app.component('LinkButton', LinkButton);
app.component('Checkbox', Checkbox);
app.component('ProgressSpinner', ProgressSpinner);
app.component('Message', Message);
app.component('Dialog', Dialog);

app.use(router)
app.use(store)

app.config.globalProperties.$primevue = {ripple: true};

app.mount('#app');