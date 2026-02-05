'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { PageHeader } from '@/components/admin/page-header'
import { FormSection, FormField, FormActions } from '@/components/admin/form-layout'
import { useToast } from '@/components/admin/toast-provider'
import { getScheduleSettings, updateScheduleSettings, updateWeeklySchedule } from '@/lib/adminStore'
import type { ScheduleSettings, WeeklySchedule } from '@/lib/types'
import { Clock } from 'lucide-react'

export default function SchedulePage() {
  const { showToast } = useToast()
  const [settings, setSettings] = useState<ScheduleSettings | null>(null)

  useEffect(() => {
    setSettings(getScheduleSettings())
  }, [])

  if (!settings) return null

  const handleGlobalNoteChange = (note: string) => {
    setSettings({ ...settings, globalNote: note })
  }

  const handleScheduleChange = (id: string, field: keyof WeeklySchedule, value: unknown) => {
    setSettings({
      ...settings,
      schedule: settings.schedule.map((day) =>
        day.id === id ? { ...day, [field]: value } : day
      ),
    })
  }

  const handleSave = () => {
    if (settings) {
      updateScheduleSettings({ globalNote: settings.globalNote })
      settings.schedule.forEach((day) => {
        updateWeeklySchedule(day.id, day)
      })
      showToast('Schedule saved successfully', 'success')
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Weekly Schedule"
        description="Manage your operating hours for each day of the week."
      />

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Global Notice</CardTitle>
        </CardHeader>
        <CardContent>
          <FormSection>
            <FormField label="Display Message" htmlFor="globalNote">
              <Textarea
                id="globalNote"
                value={settings.globalNote}
                onChange={(e) => handleGlobalNoteChange(e.target.value)}
                placeholder="Hours may change due to weather conditions..."
                className="bg-input border-border"
              />
            </FormField>
          </FormSection>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <Clock className="h-5 w-5" />
            Operating Hours
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {settings.schedule.map((day) => (
              <div
                key={day.id}
                className="flex flex-col gap-4 rounded-lg border border-border bg-secondary/30 p-4 sm:flex-row sm:items-center"
              >
                <div className="w-24 shrink-0">
                  <span className="font-medium text-foreground">{day.dayOfWeek}</span>
                </div>

                <div className="flex flex-1 flex-wrap items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Label htmlFor={`open-${day.id}`} className="text-sm text-muted-foreground">
                      Open
                    </Label>
                    <Input
                      id={`open-${day.id}`}
                      type="time"
                      value={day.openTime}
                      onChange={(e) => handleScheduleChange(day.id, 'openTime', e.target.value)}
                      disabled={day.closed}
                      className="w-32 bg-input border-border"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <Label htmlFor={`close-${day.id}`} className="text-sm text-muted-foreground">
                      Close
                    </Label>
                    <Input
                      id={`close-${day.id}`}
                      type="time"
                      value={day.closeTime}
                      onChange={(e) => handleScheduleChange(day.id, 'closeTime', e.target.value)}
                      disabled={day.closed}
                      className="w-32 bg-input border-border"
                    />
                  </div>

                  <Input
                    placeholder="Note (optional)"
                    value={day.note || ''}
                    onChange={(e) => handleScheduleChange(day.id, 'note', e.target.value)}
                    className="flex-1 min-w-[150px] bg-input border-border"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <Switch
                    id={`closed-${day.id}`}
                    checked={day.closed}
                    onCheckedChange={(checked) => handleScheduleChange(day.id, 'closed', checked)}
                  />
                  <Label
                    htmlFor={`closed-${day.id}`}
                    className="text-sm text-muted-foreground whitespace-nowrap"
                  >
                    Closed
                  </Label>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <FormActions>
        <Button
          onClick={handleSave}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          Save Schedule
        </Button>
      </FormActions>
    </div>
  )
}
