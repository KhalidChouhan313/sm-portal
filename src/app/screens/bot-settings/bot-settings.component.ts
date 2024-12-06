import { Component } from '@angular/core';

@Component({
  selector: 'app-bot-settings',
  templateUrl: './bot-settings.component.html',
  styleUrls: ['./bot-settings.component.css']
})
export class BotSettingsComponent {
  codes = [
    "ABC", "DEF", "GHI", "JKL", "MNO", "PQR", "STU", "VWX", "YZA", "BCD",
    "EFG", "HIJ", "KLM", "NOP", "QRS", "TUV", "WXY", "ZAB", "CDE", "FGH",
    "IJK", "LMN", "OPQ", "RST", "UVW", "XYZ", "ABD", "CEG", "FHI", "GJL",
    "MKP", "NOR", "PQS", "RTU", "SVA", "XBC", "YDE", "ZFG", "HLJ", "IKM",
    "LNP", "MOQ", "QRT", "TSA", "VWB", "XCY", "ZFA", "BGE", "CHF", "DKJ"
  ]

  removeCode = (code) => this.codes = this.codes.filter(item => item !== code)
}
