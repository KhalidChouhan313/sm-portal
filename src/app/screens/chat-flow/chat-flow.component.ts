import { Component } from '@angular/core';

@Component({
  selector: 'app-chat-flow',
  templateUrl: './chat-flow.component.html',
  styleUrls: ['./chat-flow.component.css']
})
export class ChatFlowComponent {
  selectedCard: any = null;
  selectedButton: any = null
  selectCard = (item: any) => {
    this.selectedCard = item;
  }

  selectButton = (item: any) => {
    this.selectedButton = item;
  }

  cards = [
    {
      type: "main",
      title: "On Click",
      desc: "A Trigger is an event that starts your Automation. Click to add a Trigger.",
      id: "m1",
      linkedTo: ["c1"],
      bottomText: "Then",
      triggers: [],
      inputs: [],
      buttons: [
      ]
    },
    {
      type: "conditional",
      title: "Conditions",
      desc: "",
      id: "c1",
      bottomText: "If Contact doesn’t match any of conditions",
      linkedTo: [],
      triggers: [
        {
          name: "Example Action 1",
          linkedTo: ["s1"]
        },
        {
          name: "Example Action 2",
          linkedTo: ["s2"]
        },
      ],
      inputs: [],
      buttons: []
    },

    {
      type: "simple-input",
      title: "Welcome Message",
      desc: "🤖 Hi, thanks for getting in touch, to get a quote or make a booking I need to get some details from you. Firstly, please send your pick-up address or send your current location through the WhatsApp Send Your Current Location feature To restart this chat just send the word home at any time",
      id: "s1",
      bottomText: "Next Steps",
      linkedTo: [],
      triggers: [],
      inputs: [
        {
          placeholder: "writing text from contact."
        }
      ],
      buttons: [],
    },
    {
      type: "simple",
      title: "Welcome Message",
      desc: "🤖 Hi, thanks for getting in touch, to get a quote or make a booking I need to get some details from you. Firstly, please send your pick-up address or send your current location through the WhatsApp Send Your Current Location feature To restart this chat just send the word home at any time",
      id: "s1",
      bottomText: "Next Steps",
      linkedTo: [],
      triggers: [],
      inputs: [],
      buttons: [
        {
          name: "Example 1 Again",
          action: () => console.log(`Example 1 triggered again.`),
          linkedTo: []
        }
      ]
    },
    {
      type: "simple",
      title: "Welcome Message",
      desc: "🤖 Hi, thanks for getting in touch, to get a quote or make a booking I need to get some details from you. Firstly, please send your pick-up address or send your current location through the WhatsApp Send Your Current Location feature To restart this chat just send the word home at any time",
      id: "s2",
      bottomText: "Next Steps",
      linkedTo: [],
      triggers: [],
      inputs: [],
      buttons: [
        {
          name: "Example 2 Again",
          action: () => console.log(`Example 2 triggered again.`),
          linkedTo: ["c2"]
        }
      ]
    },
    {
      type: "conditional",
      title: "Condition 2",
      desc: "",
      id: "c2",
      bottomText: "If Contact doesn’t match any of conditions",
      linkedTo: [],
      triggers: [
        {
          name: "Condition 2 Example 1",
          linkedTo: []
        },
        {
          name: "Condition 2 Example 2",
          linkedTo: []
        },
      ],
      inputs: [],
      buttons: []
    },
    {
      type: "simple",
      title: "Welcome Message",
      desc: "🤖 Hi, thanks for getting in touch, to get a quote or make a booking I need to get some details from you. Firstly, please send your pick-up address or send your current location through the WhatsApp Send Your Current Location feature To restart this chat just send the word home at any time",
      id: "s2",
      bottomText: "Next Steps",
      linkedTo: [],
      triggers: [],
      inputs: [],
      buttons: []
    },
  ]
}
