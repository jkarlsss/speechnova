"use client";

import { useStore } from "@tanstack/react-form";
import { Field, FieldLabel } from "../../../components/ui/field";
import { useTypedAppFormContext } from "../../../hooks/use-app-form";
import { useTTSVoices } from "../contexts/tts-voices-context";
import { ttsFormOptions } from "./text-to-speech-form";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { VoiceAvatar } from "../../../components/voice-avatar/voice-avatar";
import { VOICE_CATEGORY_LABELS } from "../../voices/data/voice-categories";

export function VoiceSelector() {
  const { allVoices: voices, customVoices, systemVoices } = useTTSVoices();

  const form = useTypedAppFormContext(ttsFormOptions);
  const voiceId = useStore(form.store, (state) => state.values.voiceId);
  const isSubmitting = useStore(form.store, (state) => state.isSubmitted);

  const selectedVoice = voices.find((v) => v.id === voiceId);
  const hasMissingSelectedVoice = Boolean(voiceId && !selectedVoice);
  const currentVoice = selectedVoice
    ? selectedVoice
    : hasMissingSelectedVoice
    ? { id: voiceId, name: "Missing Voice", category: null as null }
    : voices[0];

  return (
    <Field>
      <FieldLabel>Voice style</FieldLabel>
      <Select
        disabled={isSubmitting}
        onValueChange={(value) => form.setFieldValue("voiceId", value)}
        value={voiceId}
      >
        <SelectTrigger className="w-full h-auto gap-1 rounded-lg bg-white px-2 py-1">
          <SelectValue>
            {currentVoice && (
              <>
                <VoiceAvatar seed={currentVoice.id} name={currentVoice.name} />
                <span className="truncate font-medium text-sm tracking-tight">
                  {currentVoice.name}
                  {currentVoice.category &&
                    `- ${VOICE_CATEGORY_LABELS[currentVoice.category]}`}
                </span>
              </>
            )}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {hasMissingSelectedVoice && currentVoice && (
            <>
              <SelectGroup>
                <SelectLabel>Selected Voice</SelectLabel>
                <SelectItem value={currentVoice.id}>
                  <VoiceAvatar
                    seed={currentVoice.id}
                    name={currentVoice.name}
                  />
                  <span className="truncate font-medium text-sm tracking-tight">
                    {currentVoice.name}
                    {currentVoice.category &&
                      `- ${VOICE_CATEGORY_LABELS[currentVoice.category]}`}
                  </span>
                </SelectItem>
              </SelectGroup>
              {(customVoices.length > 0 || systemVoices.length > 0) && (
                <SelectSeparator />
              )}
            </>
          )}
          {customVoices.length > 0 && (
            <SelectGroup>
              <SelectLabel>Team Voice</SelectLabel>
              {customVoices.map((voice) => (
                <SelectItem key={voice.id} value={voice.id}>
                  <VoiceAvatar seed={voice.id} name={voice.name} />
                  <span className="truncate font-medium text-sm">
                    {voice.name} - {VOICE_CATEGORY_LABELS[voice.category]}
                  </span>
                </SelectItem>
              ))}
            </SelectGroup>
          )}
          {customVoices.length > 0 && systemVoices.length > 0 && (
            <SelectSeparator />
          )}
          {systemVoices.length > 0 && (
            <SelectGroup>
              <SelectLabel>Built-in Voices</SelectLabel>
              {systemVoices.map((voice) => (
                <SelectItem key={voice.id} value={voice.id}>
                  <VoiceAvatar seed={voice.id} name={voice.name} />
                  <span className="truncate font-medium text-sm">
                    {voice.name} - {VOICE_CATEGORY_LABELS[voice.category]}
                  </span>
                </SelectItem>
              ))}
            </SelectGroup>
          )}
        </SelectContent>
      </Select>
    </Field>
  );
}
