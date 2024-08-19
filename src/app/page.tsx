// pages/page.tsx

'use client'

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { fontSubmissionSchema } from '../schemas/fontSubmissionSchema';
import { z } from 'zod';

type FontSubmissionForm = z.infer<typeof fontSubmissionSchema>;

const SubmitFontPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FontSubmissionForm>({
    resolver: zodResolver(fontSubmissionSchema),
  });

  const onSubmit = (data: FontSubmissionForm) => {
    console.log('Form Submitted', data);
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', margin: '0', padding: '0' }}>
      {/* Top Navigation Bar */}
      <nav style={{ backgroundColor: '#ccc', padding: '10px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontWeight: 'bold' }}>Logo</div>
          <div>
            <a href="#" style={{ marginRight: '20px' }}>Authors</a>
            <a href="#" style={{ marginRight: '20px' }}>Submit a font</a>
            <a href="#">Forum</a>
          </div>
          <div>
            <a href="#" style={{ marginRight: '20px' }}>Login</a>
            <a href="#">Register</a>
          </div>
        </div>
      </nav>

      {/* Search Navigation Bar */}
      <nav style={{ backgroundColor: '#FF6F61', padding: '10px', color: '#fff' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ marginRight: '10px' }}>→</span>
          <span>Click to search</span>
        </div>
      </nav>

      {/* Form Content */}
      <div style={{ padding: '20px', maxWidth: '600px' }}>
        <h1>Submit Font</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <p>Do you have the necessary permissions to submit this font?</p>

          <div style={{ marginBottom: '10px' }}>
            <label>
              <input
                type="checkbox"
                {...register('hasPermission', { value: true })}
              />
              Yes
            </label>
          </div>

          <div>
          <label>
            <input
              type="checkbox"
              value="no"
              {...register('hasPermission')}
            />
            No
          </label>
        </div>

          {errors.hasPermission && (
            <p style={{ color: 'red' }}>{errors.hasPermission.message}</p>
          )}

          <div style={{ marginBottom: '20px' }}>
            <label>
              Font Name (mandatory):
              <input
                type="text"
                {...register('fontName')}
                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              />
            </label>
            {errors.fontName && (
              <p style={{ color: 'red' }}>{errors.fontName.message}</p>
            )}
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label>
              Name of the Designer (mandatory):
              <input
                type="text"
                {...register('designerName')}
                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              />
            </label>
            {errors.designerName && (
              <p style={{ color: 'red' }}>{errors.designerName.message}</p>
            )}
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label>
              Website of the Designer (optional):
              <input
                type="text"
                {...register('designerWebsite')}
                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              />
            </label>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label>
              Donation Link (optional):
              <input
                type="text"
                {...register('donationLink')}
                style={{ width: '100%', padding: '8px', marginTop: '5px' }}
              />
            </label>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label>
              Font Upload (title file .tff or .zip):
              <div style={{ marginTop: '5px' }}>
                <button
                  style={{ padding: '8px', backgroundColor: '#ccc', border: '1px solid #aaa' }}
                  type="button"
                >
                  Choose File
                </button>
              </div>
            </label>
          </div>

          <button
            type="submit"
            style={{ padding: '10px 20px', backgroundColor: '#FF6F61', color: '#fff', border: 'none', cursor: 'pointer' }}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default SubmitFontPage;
