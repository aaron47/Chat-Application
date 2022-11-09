import { environment } from 'src/environments/environment';
import {
  AfterViewInit,
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {
  ChatClientService,
  ChannelActionsContext,
  ChannelService,
  CustomTemplatesService,
  StreamI18nService,
} from 'stream-chat-angular';
import { AuthService } from '../auth/auth.service';
import { catchError, from, map, Observable, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, AfterViewInit {
  @ViewChild('channelActionsTemplate')
  private channelActionsTemplate!: TemplateRef<ChannelActionsContext>;

  chatIsReady$!: Observable<boolean>;

  constructor(
    private readonly chatService: ChatClientService,
    private readonly channelService: ChannelService,
    private readonly streamI18nService: StreamI18nService,
    private readonly authService: AuthService,
    private readonly customTemplatesService: CustomTemplatesService
  ) {}

  ngAfterViewInit(): void {
    this.customTemplatesService.channelActionsTemplate$.next(
      this.channelActionsTemplate
    );
  }

  ngOnInit(): void {
    this.streamI18nService.setTranslation();
    this.chatIsReady$ = this.authService.getStreamToken().pipe(
      switchMap((streamToken) =>
        this.chatService.init(
          environment.stream.key,
          this.authService.getCurrentUser().uid,
          streamToken
        )
      ),
      switchMap(() =>
        this.channelService.init({
          type: 'messaging',
          members: { $in: [this.authService.getCurrentUser().uid] },
        })
      ),
      map(() => true),
      catchError(() => of(false))
    );
  }

  onCreate(name: string) {
    const dasherizedName = name.replace(/\s+/g, '-').toLocaleLowerCase();

    const channel = this.chatService.chatClient.channel(
      'messaging',
      dasherizedName,
      {
        name,
        members: [this.authService.getCurrentUser().uid],
      }
    );
    from(channel.create());
  }
}
